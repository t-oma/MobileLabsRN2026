import { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/AppNavigator";

type Props = StackScreenProps<RootStackParamList, "Details">;

function NewsDetailScreen({ route, navigation }: Props) {
  const { item } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item.title,
    });
  }, [navigation, item.title]);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  image: {
    width: "100%",
    height: 280,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
});

export default NewsDetailScreen;
