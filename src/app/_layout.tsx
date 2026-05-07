import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ConditionsService } from '../services/conditions'; // Ajustá la ruta según tu carpeta
import '@/lib/supabase';

// Esto simula que el usuario con este ID siempre está logueado
export const MOCK_USER_ID = "dbc0f41d-77eb-44ad-b9d2-1b6682b3cb34";

export default function Layout() {
  
  useEffect(() => {
    // Ejecuta la verificación silenciosa en la consola
    ConditionsService.testConnection();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
