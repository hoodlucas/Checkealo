import { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { supabase } from "@/lib/supabase";

import { useEditProfile } from "@/hooks/useEditProfile";
import { useAuth } from "@/hooks/useAuth";

export default function EditProfileScreen() {

  const { session } = useAuth();

  const userId = session?.user?.id;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [conditions, setConditions] = useState<string[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const {
    saveProfile,
    loading,
    error,
  } = useEditProfile();

  // cargar perfil REAL desde supabase
  useEffect(() => {

    if (!userId) return;

    const fetchProfile = async () => {

      try {

        // profile
        const {
          data: profileData,
          error: profileError,
        } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (profileError) {
          throw profileError;
        }

        // condiciones
        const {
          data: conditionRelations,
          error: conditionsError,
        } = await supabase
          .from("user_conditions")
          .select(`
            condition_id,
            conditions (
              name
            )
          `)
          .eq("user_id", userId);

        if (conditionsError) {
          throw conditionsError;
        }

        const conditionNames =
          conditionRelations.map(
            (item: any) =>
              item.conditions.name
          );

        // set form
        setFullName(
          profileData.full_name || ""
        );

        setPhone(
          profileData.phone || ""
        );

        setBirthDate(
          profileData.birth_date || ""
        );

        setConditions(conditionNames);

      } catch (err) {

        console.error(
          "Error cargando perfil:",
          err
        );

      } finally {

        setLoadingProfile(false);
      }
    };

    fetchProfile();

  }, [userId]);

  const toggleCondition = (
    condition: string
  ) => {

    if (conditions.includes(condition)) {

      setConditions(
        conditions.filter(
          c => c !== condition
        )
      );

    } else {

      setConditions([
        ...conditions,
        condition,
      ]);
    }
  };

  const handleSave = async () => {

    if (!userId) return;

    const success =
      await saveProfile({
        userId,
        fullName,
        phone,
        birthDate,
        conditions,
      });

    if (success) {
      alert("Perfil actualizado");
    }
  };

  if (loadingProfile) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >

      <Text style={styles.title}>
        Ingrese sus datos personales
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.input}
        placeholder="Fecha de nacimiento"
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <View style={styles.conditionsBox}>

        <Text style={styles.conditionsTitle}>
          Seleccione una condición
        </Text>

        {[
          "Diabetes",
          "Celiaquía",
          "Hipertensión",
        ].map(condition => (

          <TouchableOpacity
            key={condition}
            style={styles.conditionItem}
            onPress={() =>
              toggleCondition(condition)
            }
          >

            <Text>
              {conditions.includes(condition)
                ? "☑"
                : "☐"}
            </Text>

            <Text style={styles.conditionText}>
              {condition}
            </Text>

          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={loading}
      >

        <Text style={styles.buttonText}>
          {
            loading
              ? "Guardando..."
              : "Guardar datos"
          }
        </Text>

      </TouchableOpacity>

      {
        error && (
          <Text style={styles.error}>
            {error}
          </Text>
        )
      }

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },

  conditionsBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },

  conditionsTitle: {
    fontWeight: "bold",
    marginBottom: 12,
  },

  conditionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  conditionText: {
    marginLeft: 10,
  },

  button: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  error: {
    color: "red",
    marginTop: 16,
    textAlign: "center",
  },
});