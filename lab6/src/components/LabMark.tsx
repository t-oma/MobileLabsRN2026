import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/theme/tokens";

export function LabMark() {
  return (
    <View style={styles.container}>
      <View style={styles.numberBox}>
        <Text style={styles.number}>06</Text>
      </View>
      <View>
        <Text style={styles.course}>REACT NATIVE</Text>
        <Text style={styles.topic}>Персональний профіль</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  numberBox: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
  },
  number: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  course: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  topic: {
    marginTop: 2,
    color: colors.ink,
    fontSize: 14,
    fontWeight: "600",
  },
});
