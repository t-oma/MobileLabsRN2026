import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { AuthScaffold } from "@/components/AuthScaffold";
import { FormField } from "@/components/FormField";
import { StatusMessage } from "@/components/StatusMessage";
import { useAuth } from "@/features/auth/AuthContext";
import { getFirebaseErrorMessage } from "@/features/auth/firebaseErrorMessage";
import {
  hasFieldErrors,
  normalizeEmail,
  type LoginFieldErrors,
  validateLogin,
} from "@/features/auth/validation";
import { colors, spacing } from "@/theme/tokens";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSignIn() {
    const errors = validateLogin(email, password);
    setFieldErrors(errors);
    setFormError(null);

    if (hasFieldErrors(errors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(normalizeEmail(email), password);
    } catch (error) {
      setFormError(getFirebaseErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthScaffold
      footer={
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Ще немає акаунта?</Text>
          <Link asChild href="/register">
            <Pressable hitSlop={8}>
              <Text style={styles.linkText}>Зареєструватися</Text>
            </Pressable>
          </Link>
        </View>
      }
      subtitle="Увійдіть, щоб переглянути й оновити власні дані."
      title="З поверненням"
    >
      <StatusMessage text={formError} />

      <FormField
        autoCapitalize="none"
        autoComplete="email"
        editable={!isSubmitting}
        error={fieldErrors.email}
        keyboardType="email-address"
        label="Email"
        onChangeText={setEmail}
        placeholder="name@example.com"
        returnKeyType="next"
        textContentType="emailAddress"
        value={email}
      />

      <FormField
        autoCapitalize="none"
        autoComplete="current-password"
        editable={!isSubmitting}
        error={fieldErrors.password}
        isPassword
        label="Пароль"
        onChangeText={setPassword}
        onSubmitEditing={() => void handleSignIn()}
        placeholder="Введіть пароль"
        returnKeyType="done"
        textContentType="password"
        value={password}
      />

      <AppButton
        loading={isSubmitting}
        onPress={() => void handleSignIn()}
        title="Увійти"
      />
    </AuthScaffold>
  );
}

const styles = StyleSheet.create({
  footerRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.xs,
  },
  footerText: {
    color: colors.muted,
    fontSize: 14,
  },
  linkText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});
