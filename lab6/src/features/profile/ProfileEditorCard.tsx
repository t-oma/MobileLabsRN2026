import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { AppCard } from "@/components/AppCard";
import { FormField } from "@/components/FormField";
import { StatusMessage } from "@/components/StatusMessage";
import {
  normalizeProfile,
  type ProfileFieldErrors,
  validateProfile,
} from "@/features/profile/profileValidation";
import { useProfileStorage } from "@/features/profile/useProfileStorage";
import { colors, spacing } from "@/theme/tokens";

type ProfileEditorCardProps = {
  user: User;
};

export function ProfileEditorCard({ user }: ProfileEditorCardProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({});
  const [formUserUid, setFormUserUid] = useState<string | null>(null);
  const { feedback, profile, save, status } = useProfileStorage(user);

  useEffect(() => {
    if (status.isLoading || formUserUid === user.uid) {
      return;
    }

    setName(profile?.name ?? "");
    setAge(profile ? String(profile.age) : "");
    setCity(profile?.city ?? "");
    setFieldErrors({});
    setFormUserUid(user.uid);
  }, [formUserUid, profile, status.isLoading, user.uid]);

  const isLoading = status.isLoading || formUserUid !== user.uid;

  const normalizedProfile = normalizeProfile(name, age, city);
  const hasProfileChanges = profile
    ? normalizedProfile.name !== profile.name ||
      normalizedProfile.age !== profile.age ||
      normalizedProfile.city !== profile.city
    : name.trim() !== "" || age.trim() !== "" || city.trim() !== "";

  async function handleSave() {
    const errors = validateProfile(name, age, city);
    setFieldErrors(errors);
    feedback.clearSaveMessages();

    if (Object.keys(errors).length > 0) {
      return;
    }

    await save(normalizedProfile);
  }

  return (
    <AppCard elevated>
      <View>
        <Text style={styles.sectionLabel}>АКАУНТ</Text>
        <Text selectable style={styles.email}>
          {user.email}
        </Text>
      </View>

      <View style={styles.divider} />

      <View>
        <Text style={styles.title}>Персональні дані</Text>
        <Text style={styles.hint}>
          Заповніть усі поля. Їх можна змінити будь-коли.
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.loadingRow}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.loadingText}>Завантажуємо профіль…</Text>
        </View>
      ) : (
        <>
          <StatusMessage text={feedback.error} />
          <StatusMessage text={feedback.success} tone="success" />
          <StatusMessage text={feedback.info} tone="info" />

          <FormField
            autoCapitalize="words"
            autoComplete="name"
            editable={!status.isSaving}
            error={fieldErrors.name}
            label="Ім’я"
            onChangeText={setName}
            placeholder="Наприклад, Олена"
            returnKeyType="next"
            textContentType="name"
            value={name}
          />

          <FormField
            editable={!status.isSaving}
            error={fieldErrors.age}
            keyboardType="number-pad"
            label="Вік"
            maxLength={3}
            onChangeText={setAge}
            placeholder="Наприклад, 20"
            returnKeyType="next"
            value={age}
          />

          <FormField
            autoCapitalize="words"
            editable={!status.isSaving}
            error={fieldErrors.city}
            label="Місто"
            onChangeText={setCity}
            onSubmitEditing={() => void handleSave()}
            placeholder="Наприклад, Київ"
            returnKeyType="done"
            value={city}
          />

          <AppButton
            disabled={!hasProfileChanges}
            loading={status.isSaving}
            onPress={() => void handleSave()}
            title="Зберегти зміни"
          />
        </>
      )}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  email: {
    marginTop: spacing.xs,
    color: colors.ink,
    fontSize: 16,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
  },
  title: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  hint: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  loadingRow: {
    minHeight: 120,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  loadingText: {
    color: colors.muted,
    fontSize: 14,
  },
});
