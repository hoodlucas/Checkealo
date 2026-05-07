import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ConditionsService } from '../services/conditions'; // Ajustá la ruta según tu carpeta
import '@/lib/supabase';

export default function Layout() {
  
  useEffect(() => {
    // Ejecuta la verificación silenciosa en la consola
    ConditionsService.testConnection();
  }, []);

  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    );
}