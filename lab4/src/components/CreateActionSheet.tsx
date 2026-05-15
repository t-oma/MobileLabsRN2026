import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

interface CreateActionSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelectType: (type: "folder" | "file") => void;
}

export default function CreateActionSheet({
  visible,
  onClose,
  onSelectType,
}: CreateActionSheetProps) {
  const handleSelect = (type: "folder" | "file") => {
    onSelectType(type);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <Text style={styles.title}>Створити</Text>

            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("folder")}
            >
              <Text style={styles.optionIcon}>📁</Text>
              <View>
                <Text style={styles.optionTitle}>Нову папку</Text>
                <Text style={styles.optionSubtitle}>Порожня директорія</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.option}
              onPress={() => handleSelect("file")}
            >
              <Text style={styles.optionIcon}>📄</Text>
              <View>
                <Text style={styles.optionTitle}>Новий текстовий файл</Text>
                <Text style={styles.optionSubtitle}>Файл .txt</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Скасувати</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheet: {
    backgroundColor: "#f2f2f7",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
    textAlign: "center",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  optionIcon: {
    fontSize: 28,
    marginRight: 14,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  optionSubtitle: {
    fontSize: 13,
    color: "#999",
    marginTop: 2,
  },
  cancelButton: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 4,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF3B30",
  },
});
