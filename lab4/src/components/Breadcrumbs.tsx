import { getBreadcrumb } from "@/utils/fileSystem";
import { Directory } from "expo-file-system";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  base: Directory;
  current: Directory;
  setCurrent: (dir: Directory) => void;
};

export default function Breadcrumbs({ base, current, setCurrent }: Props) {
  const breadcrumbs = getBreadcrumb(current);

  const goUp = () => {
    const parent = current.parentDirectory;
    if (parent.uri === base.uri) {
      setCurrent(base);
    } else if (current.uri !== base.uri) {
      setCurrent(parent);
    }
  };

  return (
    <View style={styles.breadcrumbContainer}>
      {current.uri !== base.uri && (
        <TouchableOpacity onPress={goUp} style={styles.upButton}>
          <Text style={styles.upButtonText}>⬆ Вгору</Text>
        </TouchableOpacity>
      )}
      <View style={styles.breadcrumb}>
        {breadcrumbs.map((segment, index) => (
          <View
            key={segment.uri}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            {index > 0 && <Text style={styles.breadcrumbSeparator}> / </Text>}
            <TouchableOpacity
              onPress={() => {
                if (index < breadcrumbs.length - 1) {
                  setCurrent(new Directory(segment.uri));
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
  );
}

const styles = StyleSheet.create({
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
});
