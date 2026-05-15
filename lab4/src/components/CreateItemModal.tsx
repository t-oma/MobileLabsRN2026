import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';

interface CreateItemModalProps {
  visible: boolean;
  currentPath: string;
  onClose: () => void;
  onCreateFolder: (name: string) => void;
  onCreateFile: (name: string, content: string) => void;
}

export default function CreateItemModal({
  visible,
  currentPath,
  onClose,
  onCreateFolder,
  onCreateFile,
}: CreateItemModalProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isFolder, setIsFolder] = useState(true);

  const handleCreate = () => {
    if (!name.trim()) return;
    if (isFolder) {
      onCreateFolder(name.trim());
    } else {
      onCreateFile(name.trim(), content);
    }
    setName('');
    setContent('');
    setIsFolder(true);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Створити новий об'єкт</Text>
          <View style={styles.switchRow}>
            <Text>Папка</Text>
            <Switch value={isFolder} onValueChange={setIsFolder} />
            <Text>Файл .txt</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Назва"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {!isFolder && (
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Вміст файлу"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={4}
            />
          )}
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.buttonSecondary} onPress={onClose}>
              <Text style={styles.buttonSecondaryText}>Скасувати</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonPrimary} onPress={handleCreate}>
              <Text style={styles.buttonPrimaryText}>Створити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modal: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  buttonPrimary: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonPrimaryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonSecondary: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonSecondaryText: {
    color: '#666',
  },
});
