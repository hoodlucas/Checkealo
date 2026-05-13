import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router'; 
import { supabase } from '@/lib/supabase'; 
import { useRouter } from 'expo-router';
import { Alert } from 'react-native'; 

const Login: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Atención', 'Por favor, completá todos los campos.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Error', 'Credenciales incorrectas o usuario no verificado.');
      setLoading(false);
    } else {
      setLoading(false);
      router.replace('/scanner'); 
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
          <Text style={styles.headerTitle}>Iniciar sesión</Text>
          <Text style={styles.headerSubtitle}>
            Inicia sesión con tu dirección de mail y contraseña.
          </Text>

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
                autoCorrect={false}
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

          <TouchableOpacity style={styles.forgotPasswordLink}>
            <Text style={styles.forgotPasswordText}>¿Te olvidaste la contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerTextNormal}>¿No tenés cuenta? </Text>
            <Link href="/register" asChild>
              <TouchableOpacity>
                <Text style={styles.registerTextLink}>Registrate</Text>
              </TouchableOpacity>
            </Link>
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
    marginBottom: 10,
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 35,
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
  forgotPasswordLink: {
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#3B82F6',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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

export default Login;