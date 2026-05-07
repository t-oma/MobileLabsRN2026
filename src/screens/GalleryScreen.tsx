import { View, FlatList, StyleSheet } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import GalleryGridItem from "@/features/gallery/components/GalleryGridItem";
import { galleryData } from "@/features/gallery/data";
import { spacing } from "@/theme";

export default function GalleryScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <FlatList
          data={galleryData}
          renderItem={({ item }) => <GalleryGridItem item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  listContainer: {
    paddingBottom: spacing.md,
  },
});
