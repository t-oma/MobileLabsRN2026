import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { File } from "expo-file-system";
import { RootStackParamList } from "@/navigation/AppNavigator";

type FileViewerRouteProp = RouteProp<RootStackParamList, "FileViewer">;

export default function FileViewerScreen() {
  const route = useRoute<FileViewerRouteProp>();
  const { path } = route.params;

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const file = new File(path);
        const text = await file.text();
        setContent(text);
      } catch (e: any) {
        Alert.alert("Помилка", "Не вдалося прочитати файл: " + e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [path]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const file = new File(path);
      file.write(content);
      Alert.alert("Успіх", "Файл збережено");
    } catch (e: any) {
      Alert.alert("Помилка", "Не вдалося зберегти файл: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.fileName}>{path.split("/").pop()}</Text>
      <TextInput
        style={styles.input}
        multiline
        value={content}
        onChangeText={setContent}
        placeholder="Вміст файлу..."
        textAlignVertical="top"
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? "Збереження..." : "Зберегти"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fileName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fafafa",
  },
  saveButton: {
    marginTop: 16,
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
