import { useState, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import {
  NewsItem,
  INITIAL_NEWS,
  fetchMoreNews,
  refreshNews,
} from "@/data/newsData";
import NewsItemCard from "@/components/NewsItem";

function NewsListScreen() {
  const [data, setData] = useState<NewsItem[]>(INITIAL_NEWS);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const freshData = await refreshNews();
    setData(freshData);
    setRefreshing(false);
  }, []);

  const onEndReached = useCallback(async () => {
    if (loadingMore || refreshing) return;
    setLoadingMore(true);
    const newItems = await fetchMoreNews(data.length);
    setData((prev) => [...prev, ...newItems]);
    setLoadingMore(false);
  }, [data.length, loadingMore, refreshing]);

  const renderItem = useCallback(({ item }: { item: NewsItem }) => {
    return <NewsItemCard item={item} />;
  }, []);

  const keyExtractor = useCallback((item: NewsItem) => item.id, []);

  const ListHeaderComponent = useCallback(() => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Останні новини</Text>
        <Text style={styles.headerSubtitle}>
          Оновіть, щоб отримати свіжі новини
        </Text>
      </View>
    );
  }, []);

  const ListFooterComponent = useCallback(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.footerText}>Завантаження новин...</Text>
      </View>
    );
  }, [loadingMore]);

  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      initialNumToRender={8}
      maxToRenderPerBatch={5}
      windowSize={11}
      removeClippedSubviews={true}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 16,
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1a1a1a",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  footer: {
    paddingVertical: 24,
    alignItems: "center",
  },
  footerText: {
    marginTop: 8,
    fontSize: 14,
    color: "#888",
  },
  separator: {
    height: 16,
  },
});

export default NewsListScreen;
