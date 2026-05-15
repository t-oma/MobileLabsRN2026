import { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Directory, File, Paths } from "expo-file-system";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/AppNavigator";
import {
  BASE_DIR,
  ensureBaseDir,
  readDirectory,
  getBreadcrumb,
  formatSize,
  FileItem,
} from "@/utils/fileSystem";
import FileListItem from "@/components/FileListItem";
import CreateItemModal from "@/components/CreateItemModal";

type FileManagerRouteProp = RouteProp<RootStackParamList, "FileManager">;
type FileManagerNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "FileManager"
>;

export default function FileManagerScreen() {
  const route = useRoute<FileManagerRouteProp>();
  const navigation = useNavigation<FileManagerNavProp>();

  const initialPath = route.params?.path;
  const [currentDir, setCurrentDir] = useState<Directory>(() => {
    if (initialPath) {
      return new Directory(initialPath);
    }
    return BASE_DIR;
  });

  const [items, setItems] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [totalSpace, setTotalSpace] = useState<number | null>(null);
  const [freeSpace, setFreeSpace] = useState<number | null>(null);

  const loadDirectory = useCallback(async () => {
    setLoading(true);
    await ensureBaseDir();
    try {
      const list = await readDirectory(currentDir);
      setItems(list);
    } catch (e: any) {
      Alert.alert("Помилка", "Не вдалося прочитати директорію: " + e.message);
    } finally {
      setLoading(false);
    }
  }, [currentDir]);

  const loadStats = useCallback(() => {
    try {
      setTotalSpace(Paths.totalDiskSpace);
      setFreeSpace(Paths.availableDiskSpace);
    } catch {
      // ignore unsupported platforms
    }
  }, []);

  useEffect(() => {
    loadDirectory();
  }, [loadDirectory]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const handleOpen = (item: FileItem) => {
    if (item.isDirectory) {
      setCurrentDir(new Directory(item.path));
    } else if (item.name.endsWith(".txt")) {
      navigation.navigate("FileViewer", { path: item.path });
    } else {
      Alert.alert("Інформація", "Перегляд доступний лише для .txt файлів");
    }
  };

  const handleDetails = (item: FileItem) => {
    navigation.navigate("FileDetails", {
      path: item.path,
      isDirectory: item.isDirectory,
    });
  };

  const handleDeletePress = (item: FileItem) => {
    Alert.alert(
      "Підтвердження видалення",
      `Ви впевнені, що хочете видалити ${item.name}`,
      [
        { text: "Скасувати", style: "cancel" },
        {
          text: "Видалити",
          style: "destructive",
          onPress: async () => {
            try {
              if (item.isDirectory) {
                new Directory(item.path).delete();
              } else {
                new File(item.path).delete();
              }
              loadDirectory();
            } catch (e: any) {
              Alert.alert(
                "Помилка",
                "Не вдалося видалити об'єкт: " + e.message,
              );
            }
          },
        },
      ],
    );
  };

  const handleCreateFolder = async (name: string) => {
    try {
      new Directory(currentDir, name).create({ intermediates: true });
      loadDirectory();
    } catch (e: any) {
      Alert.alert("Помилка", "Не вдалося створити папку: " + e.message);
    }
  };

  const handleCreateFile = async (name: string, content: string) => {
    try {
      const fileName = name.endsWith(".txt") ? name : name + ".txt";
      new File(currentDir, fileName).write(content);
      loadDirectory();
    } catch (e: any) {
      Alert.alert("Помилка", "Не вдалося створити файл: " + e.message);
    }
  };

  const goUp = () => {
    const parent = currentDir.parentDirectory;
    if (parent.uri === BASE_DIR.uri) {
      setCurrentDir(BASE_DIR);
    } else if (currentDir.uri !== BASE_DIR.uri) {
      setCurrentDir(parent);
    }
  };

  const breadcrumbs = getBreadcrumb(currentDir);
  const usedSpace =
    totalSpace !== null && freeSpace !== null ? totalSpace - freeSpace : null;

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Пам'ять пристрою</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {totalSpace ? formatSize(totalSpace) : "—"}
            </Text>
            <Text style={styles.statLabel}>Загальна</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {freeSpace ? formatSize(freeSpace) : "—"}
            </Text>
            <Text style={styles.statLabel}>Вільна</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {usedSpace !== null ? formatSize(usedSpace) : "—"}
            </Text>
            <Text style={styles.statLabel}>Зайнята</Text>
          </View>
        </View>
      </View>

      <View style={styles.breadcrumbContainer}>
        {currentDir.uri !== BASE_DIR.uri && (
          <TouchableOpacity onPress={goUp} style={styles.upButton}>
            <Text style={styles.upButtonText}>⬆ Вгору</Text>
          </TouchableOpacity>
        )}
        <View
          style={[
            styles.breadcrumb,
            { flexDirection: "row", alignItems: "center" },
          ]}
        >
          {breadcrumbs.map((segment, index) => (
            <View
              key={segment.uri}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {index > 0 && <Text style={styles.breadcrumbSeparator}> / </Text>}
              <TouchableOpacity
                onPress={() => {
                  if (index < breadcrumbs.length - 1) {
                    setCurrentDir(new Directory(segment.uri));
                  }
                }}
                disabled={index === breadcrumbs.length - 1}
              >
                <Text
                  style={[
                    styles.breadcrumbSegment,
                    index === breadcrumbs.length - 1 && styles.breadcrumbActive,
                  ]}
                >
                  {segment.name}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator style={styles.loader} size="large" color="#007AFF" />
      ) : items.length === 0 ? (
        <Text style={styles.empty}>Директорія порожня</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.path}
          renderItem={({ item }) => (
            <FileListItem
              item={item}
              onOpen={handleOpen}
              onDetails={handleDetails}
              onDelete={handleDeletePress}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setCreateModalVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      <CreateItemModal
        visible={createModalVisible}
        currentPath={currentDir.uri}
        onClose={() => setCreateModalVisible(false)}
        onCreateFolder={handleCreateFolder}
        onCreateFile={handleCreateFile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  statsContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  breadcrumbContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fafafa",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  upButton: {
    marginRight: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
  },
  upButtonText: {
    fontSize: 14,
    color: "#333",
  },
  breadcrumb: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  breadcrumbSegment: {
    fontSize: 14,
    color: "#007AFF",
  },
  breadcrumbActive: {
    color: "#555",
  },
  breadcrumbSeparator: {
    fontSize: 14,
    color: "#999",
  },
  loader: {
    marginTop: 40,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#999",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 80,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
});
