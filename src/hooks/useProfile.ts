import { useEffect, useState } from "react";

import { getProfile } from "../services/profile.service";
import { Profile } from "../types/profile.types";

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

        const data = await getProfile();

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