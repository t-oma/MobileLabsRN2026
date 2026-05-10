import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { type Theme, lightTheme, darkTheme } from "@/theme";

type ThemeContextType = {
  theme: Theme;
  mode: "light" | "dark" | "system";
  setMode: (mode: "light" | "dark" | "system") => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  mode: "system",
  setMode: () => {},
  isDark: false,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<"light" | "dark" | "system">("system");

  const isDark = useMemo(
    () => (mode === "system" ? systemScheme === "dark" : mode === "dark"),
    [mode],
  );
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
