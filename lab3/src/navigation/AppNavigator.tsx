import HomeScreen from "@/screens/HomeScreen";
import ChallangesScreen from "@/screens/Challanges";
import { createStaticNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "@/screens/Settings";

const RootBottomTabs = createBottomTabNavigator({
  initialRouteName: "Home",
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          );
        },
      },
    },
    Challanges: {
      screen: ChallangesScreen,
      options: {
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={focused ? "reader" : "reader-outline"}
              size={size}
              color={color}
            />
          );
        },
      },
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          );
        },
      },
    },
  },
});

const AppNavigator = createStaticNavigation(RootBottomTabs);

export default AppNavigator;
