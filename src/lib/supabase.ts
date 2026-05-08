import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
//const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabaseUrl = 'https://wojekabudakdqehfyljq.supabase.co';
const supabaseAnonKey = 'sb_publishable_HlNhxFpiwdMSiWmPIA2wvQ_Lha7hka8';


if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("El URL y la Anon Key de Supabase son obligatorios. Revisa tu archivo .env");
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

