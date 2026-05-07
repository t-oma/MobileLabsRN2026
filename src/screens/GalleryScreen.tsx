import React from "react";
import { View, FlatList, Image, StyleSheet, Dimensions } from "react-native";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { galleryData } from "@/data/mockData";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const numColumns = 2;
const itemSize = (width - 48) / numColumns;

export default function GalleryScreen() {
  const renderItem = ({ item }: { item: (typeof galleryData)[0] }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "right", "left"]}>
      <Header />
      <View style={styles.content}>
        <FlatList
          data={galleryData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  imageContainer: {
    width: itemSize,
    height: itemSize,
    margin: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
