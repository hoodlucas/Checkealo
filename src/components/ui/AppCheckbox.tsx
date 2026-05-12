import { View, Text, StyleSheet } from "react-native";

import Checkbox from "expo-checkbox";

type Props = {
  label: string;
  checked: boolean;
  disabled?: boolean;
};

export function AppCheckbox({
  label,
  checked,
  disabled = false,
}: Props) {
  return (
    <View style={styles.container}>
      <Checkbox
        value={checked}
        disabled={disabled}
      />

      <Text style={styles.label}>
        {label}
      </Text>
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
    fontSize: 15,
    color: "#000",
  },
});