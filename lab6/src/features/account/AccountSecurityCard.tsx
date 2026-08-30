import type { User } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { AppCard } from "@/components/AppCard";
import { StatusMessage } from "@/components/StatusMessage";
import { useAuth } from "@/features/auth/AuthContext";
import { getFirebaseErrorMessage } from "@/features/auth/firebaseErrorMessage";
import { colors, spacing } from "@/theme/tokens";

type AccountSecurityCardProps = {
  user: User;
};

export function AccountSecurityCard({ user }: AccountSecurityCardProps) {
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

  return (
    <AppCard style={styles.card}>
      <Text style={styles.title}>Безпека акаунта</Text>
      <Text style={styles.hint}>
        Firebase надішле на ваш email посилання для створення нового пароля.
      </Text>
      <StatusMessage text={resetError} />
      <StatusMessage text={resetSuccess} tone="success" />
      <AppButton
        loading={isSendingReset}
        onPress={() => void handlePasswordReset()}
        title="Надіслати лист для зміни пароля"
        variant="secondary"
      />

      <View style={styles.divider} />

      <Text style={styles.title}>Сесія</Text>
      <Text style={styles.hint}>
        Після виходу захищений екран стане недоступним.
      </Text>
      <StatusMessage text={signOutError} />
      <AppButton
        loading={isSigningOut}
        onPress={() => void handleSignOut()}
        title="Вийти"
        variant="secondary"
      />
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.md,
  },
  title: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  hint: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
  },
});
