import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Alert } from "react-native";
import { FileItem } from "@/utils/fileSystem";

interface FileListItemProps {
  item: FileItem;
  onOpen: (item: FileItem) => void;
  onDetails: (item: FileItem) => void;
  onDelete: (item: FileItem) => void;
}

export default function FileListItem({
  item,
  onOpen,
  onDetails,
  onDelete,
}: FileListItemProps) {
  const handlePress = () => {
    onOpen(item);
  };

  const handleLongPress = () => {
    Alert.alert(item.name, undefined, [
      { text: "Деталі", onPress: () => onDetails(item) },
      { text: "Видалити", onPress: () => onDelete(item), style: "destructive" },
      { text: "Скасувати", style: "cancel" },
    ]);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{item.isDirectory ? "📁" : "📄"}</Text>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.meta}>{item.isDirectory ? "Папка" : "Файл"}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: "#333",
  },
  meta: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: "#ccc",
  },
});
