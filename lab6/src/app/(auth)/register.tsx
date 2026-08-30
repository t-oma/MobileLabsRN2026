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
  type RegistrationFieldErrors,
  validateRegistration,
} from "@/features/auth/validation";
import { colors, spacing } from "@/theme/tokens";

export default function RegisterScreen() {
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [fieldErrors, setFieldErrors] =
    useState<RegistrationFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegistration() {
    const errors = validateRegistration(
      email,
      password,
      passwordConfirmation,
    );
    setFieldErrors(errors);
    setFormError(null);

    if (hasFieldErrors(errors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await register(normalizeEmail(email), password);
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
          <Text style={styles.footerText}>Уже маєте акаунт?</Text>
          <Link asChild href="/login">
            <Pressable hitSlop={8}>
              <Text style={styles.linkText}>Увійти</Text>
            </Pressable>
          </Link>
        </View>
      }
      subtitle="Створіть акаунт за допомогою email і пароля."
      title="Реєстрація"
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
        autoComplete="new-password"
        editable={!isSubmitting}
        error={fieldErrors.password}
        isPassword
        label="Пароль"
        onChangeText={setPassword}
        placeholder="Щонайменше 6 символів"
        returnKeyType="next"
        textContentType="newPassword"
        value={password}
      />

      <FormField
        autoCapitalize="none"
        autoComplete="new-password"
        editable={!isSubmitting}
        error={fieldErrors.passwordConfirmation}
        isPassword
        label="Повторіть пароль"
        onChangeText={setPasswordConfirmation}
        onSubmitEditing={() => void handleRegistration()}
        placeholder="Введіть пароль ще раз"
        returnKeyType="done"
        textContentType="newPassword"
        value={passwordConfirmation}
      />

      <AppButton
        loading={isSubmitting}
        onPress={() => void handleRegistration()}
        title="Створити акаунт"
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
