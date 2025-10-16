import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { supabase } from '../config/supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      showSnackbar('Please enter both email and password');
      return;
    }

    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    setLoading(false);

    if (error) {
      showSnackbar(error.message || 'Login failed');
      return;
    }

    if (data?.user) {
      // Auth context will handle navigation automatically
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      showSnackbar('Please enter both email and password');
      return;
    }

    if (password.length < 6) {
      showSnackbar('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password,
    });

    setLoading(false);

    if (error) {
      showSnackbar(error.message || 'Sign up failed');
      return;
    }

    showSnackbar('Account created! Please log in');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          Study Timer
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          Sign in to get started
        </Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          autoComplete="password"
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Log In
        </Button>

        <Button
          mode="text"
          onPress={handleSignUp}
          disabled={loading}
          style={styles.signUpButton}
        >
          Don't have an account? Sign Up
        </Button>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000}
          action={{
            label: 'Close',
            onPress: () => setSnackbarVisible(false),
          }}
        >
          {snackbarMessage}
        </Snackbar>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
    color: '#666',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
  signUpButton: {
    marginTop: 8,
  },
});
