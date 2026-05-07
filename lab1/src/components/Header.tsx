import { View, Image, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/theme";

export default function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../assets/uni-logo.webp")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>FirstMobileApp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: {
    width: 100,
    height: 50,
  },
  title: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.text,
  },
});
