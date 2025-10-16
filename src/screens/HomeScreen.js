import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button, Card, IconButton, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../config/supabase';

const FOCUS_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds
const TIMER_STATE_KEY = '@timer_state';

export default function HomeScreen({ navigation }) {
  const [seconds, setSeconds] = useState(FOCUS_TIME);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    loadTimerState();
  }, []);

  useEffect(() => {
    saveTimerState();
  }, [seconds, isActive, isBreak, completedSessions]);

  const loadTimerState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(TIMER_STATE_KEY);
      if (savedState) {
        const { seconds: savedSeconds, isBreak: savedIsBreak, completedSessions: savedSessions } = JSON.parse(savedState);
        setSeconds(savedSeconds);
        setIsBreak(savedIsBreak);
        setCompletedSessions(savedSessions);
      }
    } catch (error) {
      console.error('Error loading timer state:', error);
    }
  };

  const saveTimerState = async () => {
    try {
      const state = {
        seconds,
        isBreak,
        completedSessions,
      };
      await AsyncStorage.setItem(TIMER_STATE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving timer state:', error);
    }
  };

  const showNotification = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  useEffect(() => {
    if (isActive && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      handleTimerComplete();
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, seconds]);

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (!isBreak) {
      setCompletedSessions(prev => prev + 1);
      showNotification('🎉 Focus session complete! Time for a break!');
      setIsBreak(true);
      setSeconds(BREAK_TIME);
    } else {
      showNotification('✨ Break complete! Ready for another session?');
      setIsBreak(false);
      setSeconds(FOCUS_TIME);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(FOCUS_TIME);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem(TIMER_STATE_KEY);
    await supabase.auth.signOut();
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const progress = isBreak 
    ? ((BREAK_TIME - seconds) / BREAK_TIME) * 100
    : ((FOCUS_TIME - seconds) / FOCUS_TIME) * 100;

  return (
    <View style={styles.container}>
      <IconButton
        icon="logout"
        size={24}
        onPress={handleLogout}
        style={styles.logoutButton}
      />

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sessionType}>
            {isBreak ? '☕ Break Time' : '📚 Focus Session'}
          </Text>
          
          <Text variant="displayLarge" style={styles.timer}>
            {formatTime(seconds)}
          </Text>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <View style={styles.controls}>
            <Button
              mode="contained"
              onPress={toggleTimer}
              icon={isActive ? 'pause' : 'play'}
              style={styles.controlButton}
            >
              {isActive ? 'Pause' : 'Start'}
            </Button>

            <Button
              mode="outlined"
              onPress={resetTimer}
              icon="restart"
              style={styles.controlButton}
            >
              Reset
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.statsTitle}>
            Sessions Completed
          </Text>
          <Text variant="displayMedium" style={styles.statsNumber}>
            {completedSessions}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.infoBox}>
        <Text variant="bodyMedium" style={styles.infoText}>
          💡 Focus: 25 minutes • Break: 5 minutes
        </Text>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logoutButton: {
    alignSelf: 'flex-end',
  },
  card: {
    marginTop: 20,
    elevation: 4,
  },
  sessionType: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  timer: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ee',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  controlButton: {
    flex: 1,
  },
  statsCard: {
    marginTop: 20,
    elevation: 4,
  },
  statsTitle: {
    textAlign: 'center',
    color: '#666',
  },
  statsNumber: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6200ee',
    marginTop: 10,
  },
  infoBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  infoText: {
    textAlign: 'center',
    color: '#666',
  },
});
