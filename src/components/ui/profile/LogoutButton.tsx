import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { router } from "expo-router";

import { useAuth } from "@/hooks/useAuth";

export function LogoutButton() {

  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.replace("/login");
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleLogout}
    >
      <Text style={styles.text}>
        Cerrar sesión
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    backgroundColor: "#FF1E1E",
    height: 52,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});