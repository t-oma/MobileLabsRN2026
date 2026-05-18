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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    setError("");
    const success = login(email, password);
    if (!success) {
      setError("Невірний email або пароль");
    } else {
      router.replace("/");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вхід</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <KeyboardAvoidingView behavior="padding">
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Увійти</Text>
        </TouchableOpacity>

        <Link href="/register" style={styles.link}>
          <Text style={styles.linkText}>Немає акаунту? Зареєструватися</Text>
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
    backgroundColor: "#007AFF",
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
