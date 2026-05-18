import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { products, Product } from "@/data/products";
import { Image } from "expo-image";

function GameCard({ item }: { item: Product }) {
  return (
    <Link href={`/details/${item.id}`} asChild>
      <Pressable style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: item.image }}
          contentFit="cover"
          transition={300}
        />
        <View style={styles.cardBody}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.tags}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.platform}>{item.platform}</Text>
          </View>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

export default function CatalogScreen() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Привіт, {user?.name || "гравцю"}!</Text>
          <Text style={styles.subtitle}>Обирай свою наступну пригоду</Text>
        </View>
        <Pressable style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Вийти</Text>
        </Pressable>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GameCard item={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5ea",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    color: "#8e8e93",
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: "#ff3b30",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  list: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#e5e5ea",
  },
  cardBody: {
    padding: 16,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
    color: "#1c1c1e",
  },
  tags: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 6,
  },
  category: {
    fontSize: 12,
    color: "#8e8e93",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  dot: {
    fontSize: 12,
    color: "#c7c7cc",
  },
  platform: {
    fontSize: 12,
    color: "#007AFF",
    fontWeight: "500",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#34C759",
  },
});
