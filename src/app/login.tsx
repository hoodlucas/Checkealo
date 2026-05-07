import Login from '@/components/ui/Login';
import { useState } from 'react';
import { View, Alert } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { Screen } from '../components/ui/Screen'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Text } from '../components/ui/Text'

export default function LoginScreen() {
 const { signIn, loading, error } = useAuth()
 const [ email, setEmail] = useState('')
 const [ password, setPassword] = useState('')

 const handleLogin = async () => {
  await signIn({ email, password })
 }

  return (
    <Screen>
      <text>Iniciar sesión</text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        />
         <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        />
        {error && <text style={{ Color: 'red' }}>{error}</text>}
        <Button
        title={loading ? "Entrando..." : "Entrar"}
        onPress={handleLogin}
        disabled={loading}
        />
    </Screen>
  )
}