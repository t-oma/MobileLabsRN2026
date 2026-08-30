import type { PropsWithChildren, ReactNode } from "react";
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
import { colors, radius, spacing } from "@/theme/tokens";

type AuthScaffoldProps = PropsWithChildren<{
  title: string;
  subtitle: string;
  footer?: ReactNode;
}>;

export function AuthScaffold({
  title,
  subtitle,
  footer,
  children,
}: AuthScaffoldProps) {
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
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.accent} />
            {children}
          </View>

          {footer ? <View style={styles.footer}>{footer}</View> : null}
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
    maxWidth: 520,
    alignSelf: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
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
    maxWidth: 380,
    marginTop: spacing.sm,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
  },
  card: {
    overflow: "hidden",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 3,
  },
  accent: {
    position: "absolute",
    top: 0,
    left: spacing.lg,
    width: 64,
    height: 4,
    borderBottomLeftRadius: radius.pill,
    borderBottomRightRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  footer: {
    marginTop: spacing.lg,
    alignItems: "center",
  },
  authorFooter: {
    marginTop: "auto",
    paddingTop: spacing.xxl,
  },
});
