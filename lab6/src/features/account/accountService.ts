import { FirebaseError } from "firebase/app";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  type User,
} from "firebase/auth";

import { deleteProfile } from "@/features/profile/profileService";
import { auth } from "@/lib/firebase";

export async function deleteAccount(user: User, password: string) {
  if (auth.currentUser?.uid !== user.uid) {
    throw new FirebaseError(
      "auth/user-mismatch",
      "Account deletion requires the active Firebase user.",
    );
  }

  if (!user.email) {
    throw new FirebaseError(
      "auth/user-mismatch",
      "The current account does not have an email address.",
    );
  }

  const credential = EmailAuthProvider.credential(user.email, password);

  await reauthenticateWithCredential(user, credential);
  await deleteProfile(user);
  await deleteUser(user);
}
