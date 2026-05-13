import React from "react";
import { Stack } from "expo-router";

export default function LayoutProfile() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Profile",
        }}
      />

      <Stack.Screen
        name="EditProfileScreen"
        options={{
          title: "Editar Perfil",
        }}
      />
    </Stack>
  );
};