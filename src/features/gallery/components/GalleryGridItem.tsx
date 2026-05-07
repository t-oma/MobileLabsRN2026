import { View, Image, StyleSheet, Dimensions } from "react-native";
import { GalleryItem } from "@/types";
import { colors, spacing, borderRadius, sizes } from "@/theme";

const { width } = Dimensions.get("window");
const numColumns = 2;
const itemSize = (width - 48) / numColumns;

interface GalleryItemProps {
  item: GalleryItem;
}

export default function GalleryGridItem({ item }: GalleryItemProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: itemSize,
    height: itemSize,
    margin: spacing.xs,
    backgroundColor: "#f0f0f0",
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  image: {
    width: sizes.full,
    height: sizes.full,
  },
});
