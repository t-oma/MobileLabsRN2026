import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

import { colors, radius, spacing } from "@/theme/tokens";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
};

const buttonColors: Record<
  ButtonVariant,
  { background: string; pressed: string; border: string; text: string }
> = {
  primary: {
    background: colors.primary,
    pressed: colors.primaryPressed,
    border: colors.primary,
    text: colors.white,
  },
  secondary: {
    background: colors.surface,
    pressed: colors.primarySoft,
    border: colors.line,
    text: colors.ink,
  },
  danger: {
    background: colors.danger,
    pressed: colors.dangerPressed,
    border: colors.danger,
    text: colors.white,
  },
  ghost: {
    background: "transparent",
    pressed: colors.primarySoft,
    border: "transparent",
    text: colors.primary,
  },
};

export function AppButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
}: AppButtonProps) {
  const palette = buttonColors[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? palette.pressed : palette.background,
          borderColor: palette.border,
        },
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.text} size="small" />
      ) : (
        <Text style={[styles.label, { color: palette.text }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.1,
  },
});
