import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton } from "@/components/AppButton";
import { LabMark } from "@/components/LabMark";
import { useAuth } from "@/features/auth/AuthContext";
import { colors, radius, spacing } from "@/theme/tokens";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <View style={styles.content}>
        <LabMark />

        <View style={styles.heading}>
          <Text style={styles.title}>Ви увійшли</Text>
          <Text style={styles.subtitle}>
            Firebase Authentication зберігає активну сесію на цьому пристрої.
          </Text>
        </View>

        <View style={styles.accountCard}>
          <Text style={styles.label}>EMAIL АКАУНТА</Text>
          <Text selectable style={styles.email}>
            {user?.email}
          </Text>
        </View>

        <AppButton
          onPress={() => void signOut()}
          title="Вийти"
          variant="secondary"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    flex: 1,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
    padding: spacing.lg,
  },
  heading: {
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.ink,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "800",
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: spacing.sm,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
  },
  accountCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  label: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  email: {
    marginTop: spacing.sm,
    color: colors.ink,
    fontSize: 18,
    fontWeight: "700",
  },
});
