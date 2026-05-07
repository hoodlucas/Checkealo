import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function ProfileHeader() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.backButton}>{"< Volver a la Home"}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },

  backButton: {
    fontSize: 16,
    color: "#1D3557",
    fontWeight: "600",
    marginBottom: 24,
  },

  title: {
    fontSize: 48,
    fontWeight: "700",
    color: "#0B1F3A",
  },
});