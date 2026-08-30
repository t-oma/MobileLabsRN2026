import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { AppButton } from "@/components/AppButton";
import { AppCard } from "@/components/AppCard";
import { FormField } from "@/components/FormField";
import { StatusMessage } from "@/components/StatusMessage";
import { getFirebaseErrorMessage } from "@/features/auth/firebaseErrorMessage";
import {
  getProfile,
  saveProfile,
  type UserProfile,
} from "@/features/profile/profileService";
import {
  normalizeProfile,
  type ProfileFieldErrors,
  validateProfile,
} from "@/features/profile/profileValidation";
import { colors, spacing } from "@/theme/tokens";

type ProfileEditorCardProps = {
  user: User;
};

export function ProfileEditorCard({ user }: ProfileEditorCardProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [savedProfile, setSavedProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const currentUser = user;
    let isActive = true;

    async function loadProfile() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const profile = await getProfile(currentUser);

        if (!isActive) {
          return;
        }

        if (profile) {
          setName(profile.name);
          setAge(String(profile.age));
          setCity(profile.city);
          setSavedProfile(profile);
        } else {
          setSavedProfile(null);
          setInfoMessage("Профіль ще не заповнений. Додайте свої дані нижче.");
        }
      } catch (error) {
        if (isActive) {
          setErrorMessage(getFirebaseErrorMessage(error));
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    void loadProfile();

    return () => {
      isActive = false;
    };
  }, [user]);

  const normalizedProfile = normalizeProfile(name, age, city);
  const hasProfileChanges = savedProfile
    ? normalizedProfile.name !== savedProfile.name ||
      normalizedProfile.age !== savedProfile.age ||
      normalizedProfile.city !== savedProfile.city
    : name.trim() !== "" || age.trim() !== "" || city.trim() !== "";

  async function handleSave() {
    const errors = validateProfile(name, age, city);
    setFieldErrors(errors);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSaving(true);

    try {
      await saveProfile(user, normalizedProfile);
      setSavedProfile(normalizedProfile);
      setInfoMessage(null);
      setSuccessMessage("Профіль збережено.");
    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
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
          <StatusMessage text={errorMessage} />
          <StatusMessage text={successMessage} tone="success" />
          <StatusMessage text={infoMessage} tone="info" />

          <FormField
            autoCapitalize="words"
            autoComplete="name"
            editable={!isSaving}
            error={fieldErrors.name}
            label="Ім’я"
            onChangeText={setName}
            placeholder="Наприклад, Олена"
            returnKeyType="next"
            textContentType="name"
            value={name}
          />

          <FormField
            editable={!isSaving}
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
            editable={!isSaving}
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
            loading={isSaving}
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
