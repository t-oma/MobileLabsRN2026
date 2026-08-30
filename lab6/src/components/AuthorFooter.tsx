import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import { colors, spacing } from "@/theme/tokens";

type AuthorFooterProps = {
  style?: StyleProp<ViewStyle>;
};

export function AuthorFooter({ style }: AuthorFooterProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>АВТОР РОБОТИ</Text>
      <Text style={styles.author}>Левченко Артем, ІПЗ-23-3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.xs,
  },
  label: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  author: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    textAlign: "center",
  },
});
