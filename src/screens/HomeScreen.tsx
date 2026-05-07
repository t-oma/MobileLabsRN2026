import { View, Text, FlatList, StyleSheet } from "react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import NewsCard from "@/features/news/components/NewsCard";
import { newsData } from "@/features/news/data";
import { colors, spacing, typography } from "@/theme";

export default function HomeScreen() {
  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Новини</Text>
        <FlatList
          data={newsData}
          renderItem={({ item }) => <NewsCard item={item} />}
          keyExtractor={(item) => item.id}
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
  pageTitle: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.h1.fontWeight,
    textAlign: "center",
    marginVertical: spacing.md,
    color: colors.text,
  },
  listContainer: {
    paddingBottom: spacing.md,
  },
});
