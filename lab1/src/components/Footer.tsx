import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>Левченко Артем, ІПЗ-23-3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f0f0f0",
    paddingVertical: spacing.xs,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
});
