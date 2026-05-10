export type Theme = {
  colors: {
    background: string;
    surface: string;
    card: string;
    primary: string;
    primaryLight: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    successLight: string;
    danger: string;
    overlay: string;
  };
};

export const lightTheme: Theme = {
  colors: {
    background: "#F2F2F7",
    surface: "#FFFFFF",
    card: "#FFFFFF",
    primary: "#007AFF",
    primaryLight: "#E5F2FF",
    text: "#1C1C1E",
    textSecondary: "#8E8E93",
    border: "#E5E5EA",
    success: "#34C759",
    successLight: "#E6F9ED",
    danger: "#FF3B30",
    overlay: "rgba(0,0,0,0.05)",
  },
};

export const darkTheme: Theme = {
  colors: {
    background: "#000000",
    surface: "#1C1C1E",
    card: "#2C2C2E",
    primary: "#0A84FF",
    primaryLight: "#1C3A5C",
    text: "#FFFFFF",
    textSecondary: "#8E8E93",
    border: "#38383A",
    success: "#30D158",
    successLight: "#1C3A2A",
    danger: "#FF453A",
    overlay: "rgba(255,255,255,0.05)",
  },
};
