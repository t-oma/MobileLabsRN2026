import React from "react";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FileManagerScreen from "@/screens/FileManagerScreen";
import FileViewerScreen from "@/screens/FileViewerScreen";
import FileDetailsScreen from "@/screens/FileDetailsScreen";

export type RootStackParamList = {
  FileManager: { path?: string } | undefined;
  FileViewer: { path: string };
  FileDetails: { path: string; isDirectory: boolean };
};

const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    FileManager: {
      screen: FileManagerScreen,
      options: {
        title: "Файловий менеджер",
      },
    },
    FileViewer: {
      screen: FileViewerScreen,
      options: {
        title: "Редагування файлу",
      },
    },
    FileDetails: {
      screen: FileDetailsScreen,
      options: {
        title: "Деталі файлу",
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function AppNavigator() {
  return <Navigation />;
}
