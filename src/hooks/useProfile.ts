import { useEffect, useState } from "react";

import { getProfile } from "../services/profile.service";
import { Profile } from "../types/profile.types";
import { MOCK_USER_ID } from "@/mocks/mocks/mockUser";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(
    null
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
// Simulamos una llamada a la API para obtener el perfil(MOCK_USER_ID)
        const data = await getProfile(MOCK_USER_ID);

        setProfile(data);
      } catch (err) {
        setError("Error al cargar perfil");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  return {
    profile,
    loading,
    error,
  };
}