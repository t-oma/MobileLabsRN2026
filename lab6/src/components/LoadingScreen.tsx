import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, spacing } from "@/theme/tokens";

type LoadingScreenProps = {
  label?: string;
};

export function LoadingScreen({ label = "Завантаження…" }: LoadingScreenProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} size="large" />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    backgroundColor: colors.canvas,
  },
  label: {
    color: colors.muted,
    fontSize: 15,
  },
});
