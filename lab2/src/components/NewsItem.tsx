import { memo } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NewsItem } from "@/data/newsData";

type Props = {
  item: NewsItem;
};

function NewsItemCard({ item }: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
});

export default memo(NewsItemCard);
