import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

  const RegisterForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 

    const handleRegister = async () => {
      console.log("Intentando registrar:", email);
      if (!email || !password) {
        Alert.alert("Atención", "Por favor, completa todos los campos");
        return;
      }

      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      console.log("REGISTER DATA:", data);
      console.log("REGISTER ERROR:", error);

      if (error) {
        console.log("REGISTER ERROR:", error);
        Alert.alert("Error de registro", error.message);
        setLoading(false);
      } else {
        setLoading(false);
        Alert.alert(
          "¡Cuenta creada!",
          "Se ha enviado un correo de confirmación. Por favor, revísalo antes de iniciar sesión."
        );
        router.replace('/login');
      }
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.headerTitle}>Crear cuenta</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Correo electrónico</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="email-outline" size={24} color="#A0A0A0" style={styles.iconLeft} />
                <TextInput
                  style={styles.inputWithIcon}
                  placeholder="email@address.com"
                  placeholderTextColor="#A0A0A0"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contraseña</Text>
              <View style={styles.inputWrapper}>
                <MaterialCommunityIcons name="lock-outline" size={24} color="#A0A0A0" style={styles.iconLeft} />
                <TextInput
                  style={styles.inputWithIcon}
                  placeholder="••••••••••••"
                  placeholderTextColor="#A0A0A0"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconRight}>
                  <MaterialCommunityIcons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={24}
                    color="#A0A0A0"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.primaryButton, loading && { opacity: 0.7 }]}
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.primaryButtonText}>
                {loading ? 'Creando cuenta...' : 'Crear usuario'}
              </Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <Text style={styles.legalText}>
                Al crear la cuenta acepta los términos y condiciones del servicio.
              </Text>

              <View style={styles.loginRedirect}>
                <Text style={styles.registerTextNormal}>¿Ya tenés una cuenta? </Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                  <Text style={styles.registerTextLink}>Inicia sesión</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#F8F9FA',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: 20,
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      padding: 25,
      width: '100%',
      maxWidth: 400,
      alignSelf: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: '#1A1A1A',
      marginBottom: 30, 
      marginTop: 10,
    },
    inputGroup: {
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: 14,
      color: '#666',
      marginBottom: 8,
      fontWeight: '500',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 8,
      height: 55,
      backgroundColor: '#fff',
    },
    iconLeft: {
      paddingHorizontal: 15,
    },
    inputWithIcon: {
      flex: 1,
      height: '100%',
      fontSize: 16,
      color: '#1A1A1A',
      paddingRight: 15,
    },
    iconRight: {
      paddingHorizontal: 15,
      height: '100%',
      justifyContent: 'center',
    },
    primaryButton: {
      backgroundColor: '#3B82F6',
      borderRadius: 8,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    primaryButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    footerContainer: {
      marginTop: 10,
      alignItems: 'center',
    },
    legalText: {
      fontSize: 12,
      color: '#999',
      textAlign: 'center',
      marginBottom: 20,
      fontStyle: 'italic',
      lineHeight: 18,
    },
    loginRedirect: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    registerTextNormal: {
      fontSize: 14,
      color: '#666',
    },
    registerTextLink: {
      fontSize: 14,
      color: '#3B82F6',
      fontWeight: '600',
      textDecorationLine: 'underline',
    },
  });
  
  export default RegisterForm;