import type { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { colors } from "@/theme";
import Header from "./Header";
import Footer from "./Footer";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
}

export default function ScreenWrapper({ children, style }: ScreenWrapperProps) {
  return (
    <SafeAreaView
      style={[styles.container, style]}
      edges={["top", "right", "left"]}
    >
      <Header />

      {children}

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
