import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { AppCheckbox } from "@/components/ui/AppCheckbox";
import { useProfile } from "@/hooks/useProfile";
import { formatDate } from "@/utils/formatDate";


export function HealthConditions() {
  const { profile, loading, error } = useProfile();

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error || !profile) {
    return (
      <Text style={styles.errorText}>
        Error al cargar perfil
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Correo electrónico
        </Text>

        <TextInput
          style={styles.input}
          value={profile.email}
          editable={false}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Nombre completo
        </Text>

        <TextInput
          style={styles.input}
          value={profile.full_name ?? ""}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Teléfono</Text>

        <TextInput
          style={styles.input}
          value={profile.phone ?? ""}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Fecha de nacimiento
        </Text>

        <TextInput
          style={styles.input}
          value={formatDate(profile.birth_date) ?? ""}
        />
      </View>

      <View style={styles.conditionsContainer}>
        <Text style={styles.conditionsTitle}>
          Condición actual
        </Text>

        <AppCheckbox
          label="Diabético"
          value={profile.diabetic}
          onValueChange={() => {}}
        />

        <AppCheckbox
          label="Celíaco"
          value={profile.celiac}
          onValueChange={() => {}}
        />

        <AppCheckbox
          label="Hipertenso"
          value={profile.hypertensive}
          onValueChange={() => {}}
        />
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
    gap: 16,
    backgroundColor: "#FFF",
    minHeight: 170,
  },

  conditionsTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },

  errorText: {
    color: "red",
    fontSize: 16,
  },
});