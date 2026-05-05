import { ScrollView, StyleSheet, View } from "react-native";

import { ProfileHeader } from "./ProfileHeader";
import { HealthConditions } from "./HealthConditions";
import { LogoutButton } from "./LogoutButton";

export function ProfileForm() {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <ProfileHeader />

      <View style={styles.form}>
        <HealthConditions />

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

  form: {
    gap: 20,
  },
});