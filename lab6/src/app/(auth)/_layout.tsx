import { Redirect, Stack } from "expo-router";

import { LoadingScreen } from "@/components/LoadingScreen";
import { useAuth } from "@/features/auth/AuthContext";

export default function AuthLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen label="Перевіряємо сесію…" />;
  }

  if (user) {
    return <Redirect href="/profile" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
