import type { User } from "firebase/auth";
import { StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { AppCard } from "@/components/AppCard";
import { StatusMessage } from "@/components/StatusMessage";
import { useAccountSecurity } from "@/features/account/useAccountSecurity";
import { colors, spacing } from "@/theme/tokens";

type AccountSecurityCardProps = {
  user: User;
};

export function AccountSecurityCard({ user }: AccountSecurityCardProps) {
  const { passwordReset, session } = useAccountSecurity(user);

  return (
    <AppCard style={styles.card}>
      <Text style={styles.title}>Безпека акаунта</Text>
      <Text style={styles.hint}>
        Firebase надішле на ваш email посилання для створення нового пароля.
      </Text>
      <StatusMessage text={passwordReset.error} />
      <StatusMessage text={passwordReset.success} tone="success" />
      <AppButton
        loading={passwordReset.isLoading}
        onPress={() => void passwordReset.send()}
        title="Надіслати лист для зміни пароля"
        variant="secondary"
      />

      <View style={styles.divider} />

      <Text style={styles.title}>Сесія</Text>
      <Text style={styles.hint}>
        Після виходу захищений екран стане недоступним.
      </Text>
      <StatusMessage text={session.error} />
      <AppButton
        loading={session.isLoading}
        onPress={() => void session.signOut()}
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
