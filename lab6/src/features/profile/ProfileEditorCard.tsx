import type { User } from "firebase/auth";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { AppCard } from "@/components/AppCard";
import { FormField } from "@/components/FormField";
import { StatusMessage } from "@/components/StatusMessage";
import { useProfileForm } from "@/features/profile/useProfileForm";
import { useProfileStorage } from "@/features/profile/useProfileStorage";
import { colors, spacing } from "@/theme/tokens";

type ProfileEditorCardProps = {
  user: User;
};

export function ProfileEditorCard({ user }: ProfileEditorCardProps) {
  const { feedback, profile, save, status } = useProfileStorage(user);
  const form = useProfileForm({
    isProfileLoading: status.isLoading,
    profile,
    userUid: user.uid,
  });

  async function handleSave() {
    feedback.clearSaveMessages();
    const nextProfile = form.validate();

    if (!nextProfile) {
      return;
    }

    await save(nextProfile);
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

      {!form.isReady ? (
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
            error={form.fields.name.error}
            label="Ім’я"
            onChangeText={form.fields.name.onChangeText}
            placeholder="Наприклад, Олена"
            returnKeyType="next"
            textContentType="name"
            value={form.fields.name.value}
          />

          <FormField
            editable={!status.isSaving}
            error={form.fields.age.error}
            keyboardType="number-pad"
            label="Вік"
            maxLength={3}
            onChangeText={form.fields.age.onChangeText}
            placeholder="Наприклад, 20"
            returnKeyType="next"
            value={form.fields.age.value}
          />

          <FormField
            autoCapitalize="words"
            editable={!status.isSaving}
            error={form.fields.city.error}
            label="Місто"
            onChangeText={form.fields.city.onChangeText}
            onSubmitEditing={() => void handleSave()}
            placeholder="Наприклад, Київ"
            returnKeyType="done"
            value={form.fields.city.value}
          />

          <AppButton
            disabled={!form.hasChanges}
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
