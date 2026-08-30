import type { PropsWithChildren } from "react";
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, radius, spacing } from "@/theme/tokens";

type AppCardProps = PropsWithChildren<{
  elevated?: boolean;
  style?: StyleProp<ViewStyle>;
  tone?: "default" | "danger";
}>;

export function AppCard({
  children,
  elevated = false,
  style,
  tone = "default",
}: AppCardProps) {
  return (
    <View
      style={[
        styles.card,
        tone === "danger" && styles.danger,
        elevated && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  danger: {
    borderColor: "#F1BCC5",
  },
  elevated: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 2,
  },
});
