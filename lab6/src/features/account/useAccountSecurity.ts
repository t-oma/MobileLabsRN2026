import type { User } from "firebase/auth";
import { useState } from "react";

import { useAuth } from "@/features/auth/AuthContext";
import { getFirebaseErrorMessage } from "@/features/auth/firebaseErrorMessage";

export function useAccountSecurity(user: User) {
  const { sendPasswordReset, signOut } = useAuth();
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  async function handlePasswordReset() {
    if (!user.email) {
      setResetError("У поточного акаунта немає email.");
      return;
    }

    setIsSendingReset(true);
    setResetError(null);
    setResetSuccess(null);

    try {
      await sendPasswordReset(user.email);
      setResetSuccess("Лист для зміни пароля надіслано.");
    } catch (error) {
      setResetError(getFirebaseErrorMessage(error));
    } finally {
      setIsSendingReset(false);
    }
  }

  async function handleSignOut() {
    setIsSigningOut(true);
    setSignOutError(null);

    try {
      await signOut();
    } catch (error) {
      setSignOutError(getFirebaseErrorMessage(error));
      setIsSigningOut(false);
    }
  }

  return {
    passwordReset: {
      error: resetError,
      isLoading: isSendingReset,
      send: handlePasswordReset,
      success: resetSuccess,
    },
    session: {
      error: signOutError,
      isLoading: isSigningOut,
      signOut: handleSignOut,
    },
  };
}
