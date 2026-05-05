import { ProfileForm } from "@/components/ui/profile/ProfileForm";
import { View, StyleSheet } from "react-native";


export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ProfileForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
  },
});