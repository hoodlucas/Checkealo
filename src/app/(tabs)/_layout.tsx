/* eslint-disable prettier/prettier */
import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function LayoutTabs() {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
       <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#000'}}>
            <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false }} />
            <Tabs.Screen name="scanner" options={{ title: 'Scanner', headerShown: false}} />
            <Tabs.Screen name="profile/index" options={{ title: 'Profiles' }} />
        </Tabs>
    </SafeAreaProvider>
  );
}
