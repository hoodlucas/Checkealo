import { ActivityIndicator, ScrollView, StyleSheet, View,Text } from "react-native";

import { ProfileHeader } from "./ProfileHeader";
import { HealthConditions } from "./HealthConditions";
import { LogoutButton } from "./LogoutButton";
import { useProfile } from "@/hooks/useProfile";

export function ProfileForm() {

  const {
    profile,
    loading,
    error,
  } = useProfile();
  
   if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Error al cargar el perfil !!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ProfileHeader />

      <View style={styles.form}>
        <HealthConditions profile={profile} />

        <LogoutButton />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 180,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    gap: 20,
  },
  errorText: {
      color: "red",
      fontSize: 16,
    },
});