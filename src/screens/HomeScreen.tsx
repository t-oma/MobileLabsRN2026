import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { newsData } from "@/data/mockData";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const renderItem = ({ item }: { item: (typeof newsData)[0] }) => (
    <View style={styles.newsItem}>
      <Image source={{ uri: item.image }} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDate}>{item.date}</Text>
        <Text style={styles.newsSummary}>{item.summary}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "right", "left"]}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Новини</Text>
        <FlatList
          data={newsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 16,
  },
  newsItem: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  newsImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: "#ddd",
  },
  newsContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  newsDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  newsSummary: {
    fontSize: 14,
    color: "#555",
  },
});
