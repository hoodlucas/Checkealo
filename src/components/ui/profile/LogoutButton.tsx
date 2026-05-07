import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export function LogoutButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>Cerrar sesión</Text>
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