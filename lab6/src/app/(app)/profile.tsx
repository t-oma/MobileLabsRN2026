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
import { FormField } from "@/components/FormField";
import { LabMark } from "@/components/LabMark";
import { LoadingScreen } from "@/components/LoadingScreen";
import { StatusMessage } from "@/components/StatusMessage";
import { DeleteAccountModal } from "@/features/account/DeleteAccountModal";
import { useAuth } from "@/features/auth/AuthContext";
import { getFirebaseErrorMessage } from "@/features/auth/firebaseErrorMessage";
import {
  getProfile,
  saveProfile,
} from "@/features/profile/profileService";
import {
  normalizeProfile,
  type ProfileFieldErrors,
  validateProfile,
} from "@/features/profile/profileValidation";
import { colors, radius, spacing } from "@/theme/tokens";

export default function ProfileScreen() {
  const { user, sendPasswordReset, signOut } = useAuth();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);

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
        } else {
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
      await saveProfile(
        currentUser,
        normalizeProfile(name, age, city),
      );
      setInfoMessage(null);
      setSuccessMessage("Профіль збережено.");
    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSignOut() {
    setIsSigningOut(true);
    setErrorMessage(null);

    try {
      await signOut();
    } catch (error) {
      setErrorMessage(getFirebaseErrorMessage(error));
      setIsSigningOut(false);
    }
  }

  async function handlePasswordReset() {
    if (!currentUser.email) {
      setResetError("У поточного акаунта немає email.");
      return;
    }

    setIsSendingReset(true);
    setResetError(null);
    setResetSuccess(null);

    try {
      await sendPasswordReset(currentUser.email);
      setResetSuccess("Лист для зміни пароля надіслано.");
    } catch (error) {
      setResetError(getFirebaseErrorMessage(error));
    } finally {
      setIsSendingReset(false);
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
          <LabMark />

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

          <View style={styles.card}>
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
                  loading={isSaving}
                  onPress={() => void handleSave()}
                  title="Зберегти зміни"
                />
              </>
            )}
          </View>

          <View style={styles.actionsCard}>
            <Text style={styles.sectionTitle}>Безпека акаунта</Text>
            <Text style={styles.sectionHint}>
              Firebase надішле на ваш email посилання для створення нового
              пароля.
            </Text>
            <StatusMessage text={resetError} />
            <StatusMessage text={resetSuccess} tone="success" />
            <AppButton
              loading={isSendingReset}
              onPress={() => void handlePasswordReset()}
              title="Надіслати лист для зміни пароля"
              variant="secondary"
            />

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Сесія</Text>
            <Text style={styles.sectionHint}>
              Після виходу захищений екран стане недоступним.
            </Text>
            <AppButton
              loading={isSigningOut}
              onPress={() => void handleSignOut()}
              title="Вийти"
              variant="secondary"
            />
          </View>

          <View style={styles.dangerCard}>
            <Text style={styles.dangerTitle}>Видалення акаунта</Text>
            <Text style={styles.sectionHint}>
              Профіль Firestore і дані Firebase Authentication буде видалено
              назавжди.
            </Text>
            <AppButton
              onPress={() => setIsDeleteModalVisible(true)}
              title="Видалити акаунт"
              variant="danger"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <DeleteAccountModal
        onClose={() => setIsDeleteModalVisible(false)}
        user={currentUser}
        visible={isDeleteModalVisible}
      />
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
  card: {
    gap: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 2,
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
  actionsCard: {
    gap: spacing.md,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  dangerCard: {
    gap: spacing.md,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: "#F1BCC5",
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  dangerTitle: {
    color: colors.danger,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
});
