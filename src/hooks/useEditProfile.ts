import { useEffect, useState } from "react";

import {
  getProfile,
} from "@/services/profile.service";

import {
  updateProfile,
} from "@/services/editProfile.service";

export const MOCK_USER_ID =
  "94244a9c-d38c-4228-907e-8ad9b16a878e";

export function useEditProfile() {

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [loadingProfile, setLoadingProfile] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    async function loadProfile() {

      try {

        setLoadingProfile(true);

        const data =
          await getProfile(MOCK_USER_ID);

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

  }, []);

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