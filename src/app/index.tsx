import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router'; // Para la navegación
import Screen from '@/components/ui/Screen';
//import BrandHeader from '@/components/ui/BrandHeader';
//import logo from '../../assets/logo.png';
import Login from './login';
import BrandHeader from '@/components/ui/BrandHeader';
import { Text } from 'react-native'; // Usamos el nativo por ahora como acordamos
import logo from "../../assets/logo.png";

export default function Home() {
  const router = useRouter();

  return (
    <Screen>
      <Login />
      <BrandHeader
        title="Checkealo"
        subtitle="Escanea y cuida tu salud"
        logo={logo} 
      />

      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('/scanner')}
        >
          <Text style={styles.buttonText}>Consultar Producto 📸</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50, // Para que no quede tan pegado abajo
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerNote: {
    marginTop: 20,
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  }
});
