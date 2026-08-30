import { FirebaseError } from "firebase/app";
import type { User } from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

export type UserProfile = {
  name: string;
  age: number;
  city: string;
};

function profileDocument(user: User) {
  const activeUid = auth.currentUser?.uid;

  // Шлях завжди будуємо з активної сесії, а не з UID, введеного в інтерфейсі.
  if (!activeUid || activeUid !== user.uid) {
    throw new FirebaseError(
      "auth/user-mismatch",
      "Profile access requires the active Firebase user.",
    );
  }

  return doc(db, "users", activeUid);
}

export async function getProfile(user: User): Promise<UserProfile | null> {
  const snapshot = await getDoc(profileDocument(user));

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  if (
    typeof data.name !== "string" ||
    typeof data.age !== "number" ||
    typeof data.city !== "string"
  ) {
    throw new FirebaseError(
      "profile/invalid-data",
      "The Firestore profile has an invalid shape.",
    );
  }

  return {
    name: data.name,
    age: data.age,
    city: data.city,
  };
}

export async function saveProfile(user: User, profile: UserProfile) {
  await setDoc(
    profileDocument(user),
    {
      ...profile,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function deleteProfile(user: User) {
  await deleteDoc(profileDocument(user));
}
