import { useEffect, useState } from "react";

import { getProfile } from "../services/profile.service";
import { Profile } from "../types/profile.types";

import { useAuth } from "@/hooks/useAuth";

export function useProfile() {

  const { session } = useAuth();

  const userId = session?.user?.id;

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  
  useEffect(() => {

    if (!userId) return;

    const safeUserId = userId;

    async function loadProfile() {

      try {

        setLoading(true);

        const data =
          await getProfile(safeUserId);

        setProfile(data);

      } catch (err) {

        setError("Error al cargar perfil");

      } finally {

        setLoading(false);
      }
    }

    loadProfile();

  }, [userId]);


  return {
    profile,
    loading,
    error,
  };
}