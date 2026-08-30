import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AppButton } from "@/components/AppButton";
import { FormField } from "@/components/FormField";
import { StatusMessage } from "@/components/StatusMessage";
import { deleteAccount } from "@/features/account/accountService";
import { getFirebaseErrorMessage } from "@/features/auth/firebaseErrorMessage";
import { colors, radius, spacing } from "@/theme/tokens";

type DeleteAccountModalProps = {
  user: User;
  visible: boolean;
  onClose: () => void;
};

function deletionErrorMessage(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password")
  ) {
    return "Поточний пароль неправильний.";
  }

  return getFirebaseErrorMessage(error);
}

export function DeleteAccountModal({
  user,
  visible,
  onClose,
}: DeleteAccountModalProps) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (visible) {
      setPassword("");
      setErrorMessage(null);
    }
  }, [visible]);

  function handleClose() {
    if (!isDeleting) {
      onClose();
    }
  }

  async function handleDelete() {
    if (!password) {
      setErrorMessage("Введіть поточний пароль.");
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);

    try {
      await deleteAccount(user, password);
      onClose();
    } catch (error) {
      setErrorMessage(deletionErrorMessage(error));
      setIsDeleting(false);
    }
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
      transparent
      visible={visible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <View accessibilityViewIsModal style={styles.dialog}>
          <View style={styles.warningLabel}>
            <Text style={styles.warningLabelText}>НЕЗВОРОТНА ДІЯ</Text>
          </View>

          <Text style={styles.title}>Видалити акаунт?</Text>
          <Text style={styles.description}>
            Firebase видалить ваш профіль і дані для входу. Відновити їх після
            підтвердження не вийде.
          </Text>

          <StatusMessage text={errorMessage} />

          <FormField
            autoCapitalize="none"
            autoComplete="current-password"
            editable={!isDeleting}
            isPassword
            label="Поточний пароль"
            onChangeText={setPassword}
            onSubmitEditing={() => void handleDelete()}
            placeholder="Підтвердьте свою особу"
            returnKeyType="done"
            textContentType="password"
            value={password}
          />

          <View style={styles.actions}>
            <AppButton
              loading={isDeleting}
              onPress={() => void handleDelete()}
              title="Видалити назавжди"
              variant="danger"
            />
            <AppButton
              disabled={isDeleting}
              onPress={handleClose}
              title="Скасувати"
              variant="ghost"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
    backgroundColor: "rgba(18, 31, 51, 0.58)",
  },
  dialog: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  warningLabel: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.dangerSoft,
  },
  warningLabelText: {
    color: colors.danger,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    letterSpacing: -0.6,
  },
  description: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
});
