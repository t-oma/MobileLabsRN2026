import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

import { colors, radius, spacing } from "@/theme/tokens";

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
  isPassword?: boolean;
};

export function FormField({
  label,
  error,
  isPassword = false,
  style,
  ...inputProps
}: FormFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputFrame, error && styles.inputFrameError]}>
        <TextInput
          {...inputProps}
          accessibilityLabel={label}
          placeholderTextColor={colors.muted}
          secureTextEntry={isPassword && !isPasswordVisible}
          selectionColor={colors.primary}
          style={[styles.input, isPassword && styles.passwordInput, style]}
        />
        {isPassword ? (
          <Pressable
            accessibilityLabel={
              isPasswordVisible ? "Приховати пароль" : "Показати пароль"
            }
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => setIsPasswordVisible((value) => !value)}
            style={styles.passwordToggle}
          >
            <Text style={styles.passwordToggleText}>
              {isPasswordVisible ? "Сховати" : "Показати"}
            </Text>
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  label: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "600",
  },
  inputFrame: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  inputFrameError: {
    borderColor: colors.danger,
  },
  input: {
    flex: 1,
    minHeight: 50,
    paddingHorizontal: spacing.md,
    color: colors.ink,
    fontSize: 16,
  },
  passwordInput: {
    paddingRight: 96,
  },
  passwordToggle: {
    position: "absolute",
    right: spacing.md,
    minHeight: 40,
    justifyContent: "center",
  },
  passwordToggleText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },
  error: {
    color: colors.danger,
    fontSize: 13,
    lineHeight: 18,
  },
});
