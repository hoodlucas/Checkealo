import { useEffect, useState } from "react";

import {
  getProfile,
} from "@/services/profile.service";

import {
  updateProfile,
} from "@/services/editProfile.service";

import { useAuth } from "@/hooks/useAuth";

export function useEditProfile() {

  const { session } = useAuth();

  const userId = session?.user?.id;

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [loadingProfile, setLoadingProfile] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    if (!userId) return;

    const safeUserId = userId;

    async function loadProfile() {

      try {

        setLoadingProfile(true);

        const data =
          await getProfile(safeUserId);

        setProfile(data);

      } catch (err: any) {

        console.error(err);

        setError(
          "Error cargando perfil"
        );

      } finally {

        setLoadingProfile(false);
      }
    }

    loadProfile();

  }, [userId]);

  const saveProfile = async (
    profileData: any
  ) => {

    try {

      setLoading(true);

      await updateProfile(profileData);

      return true;

    } catch (err: any) {

      console.error(err);

      setError(
        err.message ||
        "Error guardando perfil"
      );

      return false;

    } finally {

      setLoading(false);
    }
  };

  return {
    profile,
    saveProfile,
    loading,
    loadingProfile,
    error,
  };
}