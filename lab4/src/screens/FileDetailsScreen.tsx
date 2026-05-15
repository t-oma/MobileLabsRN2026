import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { File, Directory } from 'expo-file-system';
import { RootStackParamList } from '../navigation/AppNavigator';
import { formatSize } from '../utils/fileSystem';

type FileDetailsRouteProp = RouteProp<RootStackParamList, 'FileDetails'>;

export default function FileDetailsScreen() {
  const route = useRoute<FileDetailsRouteProp>();
  const { path, isDirectory } = route.params;

  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const meta = isDirectory
          ? new Directory(path).info()
          : new File(path).info();
        setInfo(meta);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, [path, isDirectory]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!info || !info.exists) {
    return (
      <View style={styles.center}>
        <Text>Файл не знайдено</Text>
      </View>
    );
  }

  const name = path.split('/').filter(Boolean).pop() ?? '—';
  const extension = name.includes('.') ? name.split('.').pop() ?? '—' : '—';
  const typeLabel = isDirectory ? 'Папка' : extension === 'txt' ? 'Текстовий файл' : `Файл (${extension})`;
  const sizeText = isDirectory ? '—' : formatSize(info.size ?? 0);
  const modTime = info.modificationTime;
  const dateText = modTime ? new Date(modTime).toLocaleString() : '—';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <DetailRow label="Назва" value={name} />
        <DetailRow label="Тип" value={typeLabel} />
        <DetailRow label="Розмір" value={sizeText} />
        <DetailRow label="Дата модифікації" value={dateText} />
      </View>
    </View>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});
