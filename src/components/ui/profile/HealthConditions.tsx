import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export function HealthConditions() {
  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Teléfono</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Fecha de nacimiento</Text>
        <TextInput style={styles.input} />
      </View>

      <View style={styles.conditionsContainer}>
        <Text style={styles.conditionsTitle}>
          Condición actual
        </Text>

        <View style={styles.checkboxContainer}>
          <Text>☑ Diabético</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Text>☐ Celíaco</Text>
        </View>

        <View style={styles.checkboxContainer}>
          <Text>☐ Hipertenso</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  inputGroup: {
    gap: 8,
  },

  label: {
    fontSize: 14,
    color: "#7A7A7A",
    fontWeight: "500",
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    fontSize: 16,
  },

  conditionsContainer: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 16,
    padding: 16,
    gap: 14,
    backgroundColor: "#FFF",
  },

  conditionsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});