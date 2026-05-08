import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text } from "react-native";
import NewsListScreen from "@/screens/NewsListScreen";
import NewsDetailScreen from "@/screens/NewsDetailScreen";
import ContactsScreen from "@/screens/ContactsScreen";
import { NewsItem } from "@/data/newsData";

export type RootStackParamList = {
  Main: undefined;
  Details: { item: NewsItem };
};

export type DrawerParamList = {
  NewsStack: undefined;
  Contacts: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerMenuButton() {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <Pressable
      onPress={() => navigation.openDrawer()}
      style={{ marginLeft: 16 }}
    >
      <Text style={{ fontSize: 24 }}>☰</Text>
    </Pressable>
  );
}

function NewsStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={NewsListScreen}
        options={{
          title: "Новини",
          headerLeft: () => <DrawerMenuButton />,
        }}
      />
      <Stack.Screen
        name="Details"
        component={NewsDetailScreen}
        options={{ title: "Деталі" }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="NewsStack"
        component={NewsStackNavigator}
        options={{ title: "Новини" }}
      />
      <Drawer.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ title: "Контакти" }}
      />
    </Drawer.Navigator>
  );
}
