import { Stack } from "expo-router";
import { ActivityIndicator, View } from 'react-native'
import { useAuth } from "@/hooks/useAuth";

export default function RootLayout() {
 const { session, loading } = useAuth()

 if (loading) {
  return (
    <view style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    </view>
  )
 }

 if (!session) {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  )
 }

 return (
  <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name="(tabs)" />
  </Stack>
 )
}
