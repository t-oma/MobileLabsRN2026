import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter, Link } from "expo-router";
import { products } from "@/data/products";
import { Image } from "expo-image";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundTitle}>Гру не знайдено</Text>
        <Link href="/" asChild>
          <Pressable style={styles.backButton}>
            <Text style={styles.backButtonText}>На головну</Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        style={styles.image}
        source={{ uri: product.image }}
        contentFit="cover"
        transition={400}
      />

      <View style={styles.body}>
        <Text style={styles.name}>{product.name}</Text>

        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{product.category}</Text>
          </View>
          <View style={[styles.tag, styles.tagPlatform]}>
            <Text style={[styles.tagText, styles.tagTextPlatform]}>
              {product.platform}
            </Text>
          </View>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Ціна</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Назад до каталогу</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  notFoundTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1c1c1e",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 260,
    backgroundColor: "#e5e5ea",
  },
  body: {
    padding: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1c1c1e",
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: "#f2f2f7",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  tagPlatform: {
    backgroundColor: "#e5f0ff",
  },
  tagText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#8e8e93",
  },
  tagTextPlatform: {
    color: "#007AFF",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#3a3a3c",
    marginBottom: 24,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e5ea",
    marginBottom: 24,
  },
  priceLabel: {
    fontSize: 16,
    color: "#8e8e93",
    fontWeight: "500",
  },
  price: {
    fontSize: 22,
    fontWeight: "800",
    color: "#34C759",
  },
  backButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
