import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const STUDENT_NAME = "Левченко Артем";
const STUDENT_GROUP = "ІПЗ-23-3";
const AVATAR_URL = "https://picsum.photos/id/981/200/200";

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { navigation, state } = props;

  const isFocused = (routeName: string) => {
    return state.routes[state.index]?.name === routeName;
  };

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: AVATAR_URL }} style={styles.avatar} />
          <Text style={styles.name}>{STUDENT_NAME}</Text>
          <Text style={styles.group}>{STUDENT_GROUP}</Text>
        </View>

        <View style={styles.divider} />

        <DrawerItem
          label="Новини"
          labelStyle={[
            styles.menuLabel,
            isFocused("NewsStack") && styles.menuLabelActive,
          ]}
          style={[
            styles.menuItem,
            isFocused("NewsStack") && styles.menuItemActive,
          ]}
          onPress={() => navigation.navigate("NewsStack")}
        />
        <DrawerItem
          label="Контакти"
          labelStyle={[
            styles.menuLabel,
            isFocused("Contacts") && styles.menuLabelActive,
          ]}
          style={[
            styles.menuItem,
            isFocused("Contacts") && styles.menuItemActive,
          ]}
          onPress={() => navigation.navigate("Contacts")}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingTop: 0,
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: "#007AFF",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  group: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#e5e5ea",
    marginVertical: 8,
  },
  menuItem: {
    marginHorizontal: 12,
    borderRadius: 8,
  },
  menuItemActive: {
    backgroundColor: "#e5f1ff",
  },
  menuLabel: {
    fontSize: 16,
    color: "#1a1a1a",
  },
  menuLabelActive: {
    color: "#007AFF",
    fontWeight: "600",
  },
});

export default CustomDrawerContent;
