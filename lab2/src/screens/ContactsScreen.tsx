import { memo, useCallback } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { CONTACT_SECTIONS, Contact } from "@/data/contactsData";
import { SafeAreaView } from "react-native-safe-area-context";

function ContactsScreen() {
  const renderItem = useCallback(({ item }: { item: Contact }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    );
  }, []);

  const renderSectionHeader = useCallback(
    ({ section }: { section: { title: string } }) => {
      return (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
        </View>
      );
    },
    [],
  );

  const keyExtractor = useCallback((item: Contact) => item.id, []);

  const ItemSeparatorComponent = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={CONTACT_SECTIONS}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  listContent: {
    paddingVertical: 8,
  },
  sectionHeader: {
    backgroundColor: "#e5e5ea",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#555",
  },
  itemContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: "#888",
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e5ea",
    marginLeft: 16,
  },
});

export default memo(ContactsScreen);
