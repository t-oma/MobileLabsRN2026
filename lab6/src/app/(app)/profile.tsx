import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton } from "@/components/AppButton";
import { AppCard } from "@/components/AppCard";
import { AuthorFooter } from "@/components/AuthorFooter";
import { FormField } from "@/components/FormField";
import { LoadingScreen } from "@/components/LoadingScreen";
import { StatusMessage } from "@/components/StatusMessage";
import { AccountSecurityCard } from "@/features/account/AccountSecurityCard";
import { DeleteAccountCard } from "@/features/account/DeleteAccountCard";
import { useAuth } from "@/features/auth/AuthContext";
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
import { colors, radius, spacing } from "@/theme/tokens";

export default function ProfileScreen() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [savedProfile, setSavedProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const currentUser = user;
    let isActive = true;

    async function loadProfile() {
      setIsLoadingProfile(true);
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
          setIsLoadingProfile(false);
        }
      }
    }

    void loadProfile();

    return () => {
      isActive = false;
    };
  }, [user]);

  if (!user) {
    return <LoadingScreen label="Перевіряємо сесію…" />;
  }

  const currentUser = user;
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
      await saveProfile(currentUser, normalizedProfile);
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
    <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heading}>
            <Text style={styles.title}>Мій профіль</Text>
            <Text style={styles.subtitle}>
              Ці дані зберігаються у вашому особистому документі Firestore.
            </Text>
          </View>

          <View style={styles.securityStrip}>
            <View style={styles.securityMark}>
              <Text style={styles.securityCheck}>✓</Text>
            </View>
            <View style={styles.securityCopy}>
              <Text style={styles.securityTitle}>UID перевірено</Text>
              <Text numberOfLines={1} selectable style={styles.uid}>
                {currentUser.uid}
              </Text>
            </View>
          </View>

          <AppCard elevated>
            <View>
              <Text style={styles.sectionLabel}>АКАУНТ</Text>
              <Text selectable style={styles.email}>
                {currentUser.email}
              </Text>
            </View>

            <View style={styles.divider} />

            <View>
              <Text style={styles.sectionTitle}>Персональні дані</Text>
              <Text style={styles.sectionHint}>
                Заповніть усі поля. Їх можна змінити будь-коли.
              </Text>
            </View>

            {isLoadingProfile ? (
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

          <AccountSecurityCard user={currentUser} />

          <DeleteAccountCard user={currentUser} />

          <AuthorFooter style={styles.authorFooter} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 640,
    alignSelf: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  heading: {
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.ink,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: "800",
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: spacing.sm,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
  },
  securityStrip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  securityMark: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  securityCheck: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "800",
  },
  securityCopy: {
    flex: 1,
  },
  securityTitle: {
    color: colors.primaryPressed,
    fontSize: 14,
    fontWeight: "800",
  },
  uid: {
    marginTop: 2,
    color: colors.muted,
    fontSize: 12,
  },
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
  sectionTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  sectionHint: {
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
  authorFooter: {
    marginTop: spacing.xxl,
  },
});
