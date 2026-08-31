import type { User } from "firebase/auth";
import { useEffect, useState } from "react";

import { getFirebaseErrorMessage } from "@/features/auth/firebaseErrorMessage";
import {
  getProfile,
  saveProfile,
  type UserProfile,
} from "@/features/profile/profileService";

export function useProfileStorage(user: User) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadedUserUid, setLoadedUserUid] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadProfile() {
      setIsLoading(true);
      setLoadedUserUid(null);
      setProfile(null);
      setErrorMessage(null);
      setSuccessMessage(null);
      setInfoMessage(null);

      try {
        const nextProfile = await getProfile(user);

        if (!isActive) {
          return;
        }

        setProfile(nextProfile);

        if (!nextProfile) {
          setInfoMessage(
            "Профіль ще не заповнений. Додайте свої дані нижче.",
          );
        }
      } catch (error) {
        if (isActive) {
          setErrorMessage(getFirebaseErrorMessage(error));
        }
      } finally {
        if (isActive) {
          setLoadedUserUid(user.uid);
          setIsLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      isActive = false;
    };
  }, [user]);

  function clearSaveFeedback() {
    setErrorMessage(null);
    setSuccessMessage(null);
  }

  async function save(nextProfile: UserProfile) {
    setIsSaving(true);
    clearSaveFeedback();

    try {
      await saveProfile(user, nextProfile);
      setProfile(nextProfile);
      setInfoMessage(null);
      setSuccessMessage("Профіль збережено.");
    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }

  const hasCurrentProfile = loadedUserUid === user.uid;

  return {
    profile: hasCurrentProfile ? profile : null,
    feedback: {
      clearSaveMessages: clearSaveFeedback,
      error: errorMessage,
      info: infoMessage,
      success: successMessage,
    },
    status: {
      isLoading: isLoading || !hasCurrentProfile,
      isSaving,
    },
    save,
  };
}
