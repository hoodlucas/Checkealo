import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// 1. Validar variables de entorno ANTES de inicializar el cliente
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("El URL y la Anon Key de Supabase son obligatorios. Revisa tu archivo .env");
}

// 2. Inicializar el cliente una sola vez con la configuración de autenticación
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Esencial para React Native/Expo
  },
});

