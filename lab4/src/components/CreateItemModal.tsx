import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface CreateItemModalProps {
  visible: boolean;
  type: "folder" | "file" | null;
  onClose: () => void;
  onCreateFolder: (name: string) => void;
  onCreateFile: (name: string, content: string) => void;
}

export default function CreateItemModal({
  visible,
  type,
  onClose,
  onCreateFolder,
  onCreateFile,
}: CreateItemModalProps) {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (visible) {
      setName("");
      setContent("");
    }
  }, [visible, type]);

  const handleCreate = () => {
    if (!name.trim()) return;

    if (type === "folder") {
      onCreateFolder(name.trim());
    } else if (type === "file") {
      onCreateFile(name.trim(), content);
    }

    onClose();
  };

  const isFolder = type === "folder";
  const title = isFolder ? "Нова папка" : "Новий текстовий файл";
  const namePlaceholder = isFolder ? "Назва папки" : "Назва файлу";

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>

          <TextInput
            style={styles.input}
            placeholder={namePlaceholder}
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
          />

          {!isFolder && (
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Вміст файлу..."
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          )}

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.buttonSecondary} onPress={onClose}>
              <Text style={styles.buttonSecondaryText}>Скасувати</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonPrimary,
                !name.trim() && styles.buttonPrimaryDisabled,
              ]}
              onPress={handleCreate}
              disabled={!name.trim()}
            >
              <Text style={styles.buttonPrimaryText}>Створити</Text>
            </TouchableOpacity>
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
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  modal: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
    gap: 12,
  },
  buttonPrimary: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonPrimaryDisabled: {
    backgroundColor: "#b3d7ff",
  },
  buttonPrimaryText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonSecondary: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonSecondaryText: {
    color: "#666",
    fontSize: 16,
  },
});
