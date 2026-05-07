import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "@/screens/HomeScreen";
import GalleryScreen from "@/screens/GalleryScreen";
import ProfileScreen from "@/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const icons = {
  home: {
    default: "home-outline",
    focused: "home",
  },
  gallery: {
    default: "images-outline",
    focused: "images",
  },
  profile: {
    default: "person-outline",
    focused: "person",
  },
} as const;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={
                  icons[route.name.toLowerCase() as keyof typeof icons][
                    focused ? "focused" : "default"
                  ]
                }
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: "#4285F4",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Головна",
          }}
        />
        <Tab.Screen
          name="Gallery"
          component={GalleryScreen}
          options={{
            tabBarLabel: "Фотогалерея",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Профіль",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
