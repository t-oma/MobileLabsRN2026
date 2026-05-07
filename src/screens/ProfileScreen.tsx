import { ScrollView, StyleSheet } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import RegisterForm from "@/features/auth/components/RegisterForm";
import { colors, spacing, typography } from "@/theme";
import { Text } from "react-native";

export default function ProfileScreen() {
  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Реєстрація</Text>
        <RegisterForm />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  pageTitle: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.h1.fontWeight,
    textAlign: "center",
    marginVertical: spacing.lg,
    color: colors.text,
  },
});
