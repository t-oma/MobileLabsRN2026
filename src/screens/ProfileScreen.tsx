import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleRegister = () => {
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
    <SafeAreaView style={styles.container} edges={["top", "right", "left"]}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.pageTitle}>Реєстрація</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Електронна пошта</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Введіть email"
          />

          <Text style={styles.label}>Пароль</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Введіть пароль"
          />

          <Text style={styles.label}>Пароль (ще раз)</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="Підтвердіть пароль"
          />

          <Text style={styles.label}>Прізвище</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Введіть прізвище"
          />

          <Text style={styles.label}>Ім'я</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Введіть ім'я"
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Зареєструватися</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 24,
    color: "#333",
  },
  form: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  button: {
    backgroundColor: "#4285F4",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
