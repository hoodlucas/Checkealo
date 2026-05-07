/* eslint-disable prettier/prettier */
import { Tabs } from 'expo-router';
import React from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";

export default function LayoutTabs() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
       <Tabs screenOptions={{ 
                  headerShown: false,

                  tabBarStyle: {
                  position: 'absolute',
                  height: 70 + insets.bottom,
                  paddingTop: 8,
                  paddingBottom: insets.bottom,
                  borderTopWidth: 0,
                  elevation: 10,
                  },
                  tabBarLabelStyle: {fontSize: 12,},

                  tabBarActiveTintColor: "#0B1F3A",
                  tabBarInactiveTintColor: "#9CA3AF",}}>

            <Tabs.Screen 
              name="index" 
              options={{ 
                title: 'Home', 
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home-outline" size={size} color={color} />
                ),
                headerShown: false }} />

            <Tabs.Screen 
              name="scanner" 
              options={{ 
                title: 'Scanner',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="barcode-outline" size={size} color={color} />
                ), 
                headerShown: false}} />
                
            <Tabs.Screen 
              name="profile/index" 
              options={{ 
                title: 'Profile',
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="person-circle-outline" size={size} color={color} />
                ),
              }} />
        </Tabs>
    </SafeAreaProvider>
  );
}
