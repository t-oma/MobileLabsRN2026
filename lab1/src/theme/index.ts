export const colors = {
  primary: "#4285F4",
  primaryDark: "#3367D6",
  secondary: "#34A853",
  background: "#FFFFFF",
  surface: "#F9F9F9",
  border: "#E0E0E0",
  text: "#333333",
  textSecondary: "#666666",
  textMuted: "#999999",
  error: "#EA4335",
  white: "#FFFFFF",
  black: "#000000",
} as const;

export const sizes = {
  full: "100%",
  half: "50%",
  quarter: "25%",
  third: "33.333%",
  twoThird: "66.666%",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const typography = {
  h1: { fontSize: 28, fontWeight: "700" },
  h2: { fontSize: 24, fontWeight: "700" },
  h3: { fontSize: 20, fontWeight: "600" },
  body: { fontSize: 16, fontWeight: "400" },
  caption: { fontSize: 14, fontWeight: "400" },
  small: { fontSize: 12, fontWeight: "400" },
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;
