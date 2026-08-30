import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/theme/tokens";

type StatusMessageProps = {
  text?: string | null;
  tone?: "error" | "success" | "info";
};

const toneColors = {
  error: { background: colors.dangerSoft, foreground: colors.danger },
  success: { background: colors.successSoft, foreground: colors.success },
  info: { background: colors.primarySoft, foreground: colors.primary },
} as const;

export function StatusMessage({ text, tone = "error" }: StatusMessageProps) {
  if (!text) {
    return null;
  }

  const palette = toneColors[tone];

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <Text style={[styles.text, { color: palette.foreground }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
});
