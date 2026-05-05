import React, { useEffect } from 'react';
import Screen from '@/components/ui/Screen';
import { Button } from 'react-native';
import { router } from 'expo-router';



export default function Home() {
    
  return (
    <Screen>
        <Button title="Go to Scanner" onPress={() => router.push('/scanner')} />
    </Screen>
  );
}
