import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://eugjnwiqjppbitxxwjgp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1Z2pud2lxanBwYml0eHh3amdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMjA4MjMsImV4cCI6MjA3NTU5NjgyM30.yyKelGHO34T-NOGdboT-IvmA7-HPFoG8FzwCyLq5yXs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
