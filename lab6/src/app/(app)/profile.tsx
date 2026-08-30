import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthorFooter } from "@/components/AuthorFooter";
import { LoadingScreen } from "@/components/LoadingScreen";
import { AccountSecurityCard } from "@/features/account/AccountSecurityCard";
import { DeleteAccountCard } from "@/features/account/DeleteAccountCard";
import { useAuth } from "@/features/auth/AuthContext";
import { ProfileEditorCard } from "@/features/profile/ProfileEditorCard";
import { colors, radius, spacing } from "@/theme/tokens";

export default function ProfileScreen() {
  const { user } = useAuth();

  if (!user) {
    return <LoadingScreen label="Перевіряємо сесію…" />;
  }

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heading}>
            <Text style={styles.title}>Мій профіль</Text>
            <Text style={styles.subtitle}>
              Ці дані зберігаються у вашому особистому документі Firestore.
            </Text>
          </View>

          <View style={styles.securityStrip}>
            <View style={styles.securityMark}>
              <Text style={styles.securityCheck}>✓</Text>
            </View>
            <View style={styles.securityCopy}>
              <Text style={styles.securityTitle}>UID перевірено</Text>
              <Text numberOfLines={1} selectable style={styles.uid}>
                {user.uid}
              </Text>
            </View>
          </View>

          <ProfileEditorCard user={user} />

          <AccountSecurityCard user={user} />

          <DeleteAccountCard user={user} />

          <AuthorFooter style={styles.authorFooter} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
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
  securityStrip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  securityMark: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  securityCheck: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "800",
  },
  securityCopy: {
    flex: 1,
  },
  securityTitle: {
    color: colors.primaryPressed,
    fontSize: 14,
    fontWeight: "800",
  },
  uid: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 12,
  },
  authorFooter: {
    marginTop: spacing.xxl,
  },
});
