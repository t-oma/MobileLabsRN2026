import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

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
  validateResetEmail,
} from "@/features/auth/validation";
import { colors } from "@/theme/tokens";

export default function ForgotPasswordScreen() {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handlePasswordReset() {
    const errors = validateResetEmail(email);
    setFieldErrors(errors);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (hasFieldErrors(errors)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await sendPasswordReset(normalizeEmail(email));
      setSuccessMessage(
        "Лист надіслано. Перевірте вхідні повідомлення та папку «Спам».",
      );
    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthScaffold
      footer={
        <Link asChild href="/login">
          <Pressable hitSlop={8}>
            <Text style={styles.linkText}>Повернутися до входу</Text>
          </Pressable>
        </Link>
      }
      subtitle="Firebase надішле посилання для створення нового пароля."
      title="Відновлення пароля"
    >
      <StatusMessage text={errorMessage} />
      <StatusMessage text={successMessage} tone="success" />

      <FormField
        autoCapitalize="none"
        autoComplete="email"
        editable={!isSubmitting}
        error={fieldErrors.email}
        keyboardType="email-address"
        label="Email"
        onChangeText={setEmail}
        onSubmitEditing={() => void handlePasswordReset()}
        placeholder="name@example.com"
        returnKeyType="send"
        textContentType="emailAddress"
        value={email}
      />

      <AppButton
        loading={isSubmitting}
        onPress={() => void handlePasswordReset()}
        title="Надіслати лист"
      />
    </AuthScaffold>
  );
}

const styles = StyleSheet.create({
  linkText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
});
