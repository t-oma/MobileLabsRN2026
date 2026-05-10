import { darkTheme, lightTheme } from "@/theme";
import { Appearance, useColorScheme } from "react-native";

export function useTheme() {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  const theme = isDark ? darkTheme : lightTheme;

  return {
    theme,
    isDark,
    mode: colorScheme,
    setMode: Appearance.setColorScheme,
  };
}
