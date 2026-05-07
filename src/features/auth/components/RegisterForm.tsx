import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { colors, spacing, borderRadius, typography } from "@/theme";
import { RegisterFormData } from "@/types";

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    lastName: "",
    firstName: "",
  });

  const updateField = (field: keyof RegisterFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    const { email, password, confirmPassword, lastName, firstName } = form;
    if (!email || !password || !confirmPassword || !lastName || !firstName) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Помилка", "Паролі не співпадають");
      return;
    }
    Alert.alert("Успіх", "Реєстрація пройшла успішно!");
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>Електронна пошта</Text>
      <TextInput
        style={styles.input}
        value={form.email}
        onChangeText={(v) => updateField("email", v)}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Введіть email"
      />

      <Text style={styles.label}>Пароль</Text>
      <TextInput
        style={styles.input}
        value={form.password}
        onChangeText={(v) => updateField("password", v)}
        secureTextEntry
        placeholder="Введіть пароль"
      />

      <Text style={styles.label}>Пароль (ще раз)</Text>
      <TextInput
        style={styles.input}
        value={form.confirmPassword}
        onChangeText={(v) => updateField("confirmPassword", v)}
        secureTextEntry
        placeholder="Підтвердіть пароль"
      />

      <Text style={styles.label}>Прізвище</Text>
      <TextInput
        style={styles.input}
        value={form.lastName}
        onChangeText={(v) => updateField("lastName", v)}
        placeholder="Введіть прізвище"
      />

      <Text style={styles.label}>Ім'я</Text>
      <TextInput
        style={styles.input}
        value={form.firstName}
        onChangeText={(v) => updateField("firstName", v)}
        placeholder="Введіть ім'я"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.body.fontSize,
    color: colors.text,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.body.fontSize,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: "center",
    marginTop: spacing.lg,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.body.fontSize,
    fontWeight: "600",
  },
});
