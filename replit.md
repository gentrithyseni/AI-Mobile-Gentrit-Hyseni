# AI-Mobile-Gentrit-Hyseni - Study Timer App

## Project Overview
A React Native mobile app with Supabase authentication and a Pomodoro study timer. Built with Expo for web deployment on Replit.

## Current State
- **Status**: ✅ Fully functional and deployed
- **Last Updated**: October 16, 2025
- **Framework**: React Native (Expo Web)
- **Port**: 5000

## Features

### 1. Authentication System
- Email & password login using Supabase Auth
- User sign-up functionality
- Session persistence across page reloads
- Automatic navigation based on auth state
- Error handling with SnackBar notifications
- Secure logout with session cleanup

### 2. Pomodoro Study Timer
- **Focus Sessions**: 25 minutes of concentrated work
- **Break Periods**: 5 minutes of rest
- **Controls**: Start, Pause, and Reset functionality
- **Visual Progress**: Progress bar showing session completion
- **Session Tracking**: Counter for completed focus sessions
- **State Persistence**: Timer state saved to AsyncStorage
- **Notifications**: Snackbar alerts when sessions/breaks complete

## Technical Architecture

### Stack
- **Frontend**: React Native (Expo)
- **UI Library**: React Native Paper
- **Navigation**: React Navigation (Stack Navigator)
- **Authentication**: Supabase Auth
- **State Persistence**: AsyncStorage
- **Package Manager**: npm

### Project Structure
```
/
├── App.js                          # Main app with auth-driven navigation
├── index.js                        # Expo entry point
├── babel.config.js                 # Babel configuration
├── app.json                        # Expo configuration
├── package.json                    # Dependencies and scripts
├── src/
│   ├── config/
│   │   └── supabase.js            # Supabase client configuration
│   ├── contexts/
│   │   └── AuthContext.js         # Auth state management
│   ├── screens/
│   │   ├── LoginScreen.js         # Login/signup screen
│   │   └── HomeScreen.js          # Pomodoro timer screen
```

### Key Implementation Details

**Authentication Flow:**
1. AuthContext checks for existing session on app load
2. Subscribes to Supabase auth state changes
3. Automatically navigates between Login and Home screens
4. Session persists in AsyncStorage via Supabase client

**Timer Persistence:**
- Saves current time, break status, and completed sessions to AsyncStorage
- Restores state on component mount
- Clears saved state on logout

**Workflow Configuration:**
- Command: `npm start` (runs `expo start --web --port 5000`)
- Output Type: Web view
- Port: 5000

## Supabase Configuration
- **URL**: https://eugjnwiqjppbitxxwjgp.supabase.co
- **Key**: Public anon key (client-safe, embedded in source)
- **Storage**: AsyncStorage for session persistence

## How to Use

### For Users:
1. **First Time**: Click "Don't have an account? Sign Up" to create an account
2. **Login**: Enter email and password, click "Log In"
3. **Timer**: Start a 25-minute focus session, app will alert when done
4. **Break**: After each session, take a 5-minute break
5. **Track Progress**: See completed sessions counter
6. **Logout**: Click logout icon in top right

### For Developers:
1. Run `npm install` to install dependencies
2. Run `npm start` to start the dev server
3. App runs on `http://localhost:5000`

## Recent Changes (October 16, 2025)
- ✅ Implemented AuthContext for session persistence
- ✅ Added AsyncStorage for timer state persistence
- ✅ Added Snackbar notifications for session completion
- ✅ Fixed authentication flow to survive page reloads
- ✅ Cleaned up navigation to be auth-state driven

## Known Considerations
- Environment variables: Currently using hardcoded Supabase credentials (public anon key is safe for client-side)
- Package versions: Some peer dependency warnings exist but don't affect functionality
- Timer pause state: Not persisted (intentional - fresh start on reload)

## Technologies Used
- [x] Supabase (Auth & Database)
- [x] React Native with Expo
- [x] React Navigation
- [x] AsyncStorage
- [x] React Native Paper (Material Design)

## Author
Gentrit Hyseni
