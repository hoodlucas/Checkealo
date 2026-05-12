import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ConditionsService } from '../services/conditions'; // Ajustá la ruta según tu carpeta
import '@/lib/supabase';

// Esto simula que el usuario con este ID siempre está logueado
export const MOCK_USER_ID = "dbc0f41d-77eb-44ad-b9d2-1b6682b3cb34";

export default function RootLayout() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!session) {
    return (
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        {/* <Stack.Screen name="register" /> */}
      </Stack>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
