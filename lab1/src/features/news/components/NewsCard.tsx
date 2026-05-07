import { View, Image, Text, StyleSheet } from "react-native";
import { NewsItem } from "@/types";
import { colors, spacing, borderRadius, typography } from "@/theme";

interface NewsCardProps {
  item: NewsItem;
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.summary}>{item.summary}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.sm,
    backgroundColor: "#ddd",
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: "center",
  },
  title: {
    fontSize: typography.body.fontSize,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  date: {
    fontSize: typography.caption.fontSize,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  summary: {
    fontSize: typography.caption.fontSize,
    color: colors.text,
  },
});
