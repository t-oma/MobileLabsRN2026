import type { User } from "firebase/auth";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";

import { AppButton } from "@/components/AppButton";
import { AppCard } from "@/components/AppCard";
import { DeleteAccountModal } from "@/features/account/DeleteAccountModal";
import { colors, spacing } from "@/theme/tokens";

type DeleteAccountCardProps = {
  user: User;
};

export function DeleteAccountCard({ user }: DeleteAccountCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <AppCard style={styles.card} tone="danger">
        <Text style={styles.title}>Видалення акаунта</Text>
        <Text style={styles.hint}>
          Профіль Firestore і дані Firebase Authentication буде видалено
          назавжди.
        </Text>
        <AppButton
          onPress={() => setIsModalVisible(true)}
          title="Видалити акаунт"
          variant="danger"
        />
      </AppCard>

      <DeleteAccountModal
        onClose={() => setIsModalVisible(false)}
        user={user}
        visible={isModalVisible}
      />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.md,
  },
  title: {
    color: colors.danger,
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
});
