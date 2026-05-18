import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = () => {
    setError("");

    if (!email.includes("@")) {
      setError("Введіть коректний email");
      return;
    }
    if (password.length < 6) {
      setError("Пароль має бути не менше 6 символів");
      return;
    }
    if (password !== confirmPassword) {
      setError("Паролі не співпадають");
      return;
    }

    const success = register(email, password, name);
    if (!success) {
      setError("Користувач з таким email вже існує");
    } else {
      router.replace("/");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Реєстрація</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.input}
          placeholder="Ім'я"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Пароль"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Підтвердження паролю"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>

        <Link href="/login" style={styles.link}>
          <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
        </Link>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#34C759",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    marginTop: 16,
    paddingBottom: 16,
    alignSelf: "center",
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
  },
  error: {
    color: "#ff3b30",
    marginBottom: 12,
    textAlign: "center",
  },
});
