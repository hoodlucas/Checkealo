import Checkbox from "expo-checkbox";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function AppCheckbox({
  label,
  value,
  onValueChange,
}: Props) {
  return (
    <View style={styles.container}>
      <Checkbox
        value={value}
        onValueChange={onValueChange}
      />

      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  label: {
    fontSize: 16,
  },
});