import { Redirect, Stack } from "expo-router";

import { LoadingScreen } from "@/components/LoadingScreen";
import { useAuth } from "@/features/auth/AuthContext";

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen label="Перевіряємо сесію…" />;
  }

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
