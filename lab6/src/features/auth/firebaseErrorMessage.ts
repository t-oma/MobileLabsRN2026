import { FirebaseError } from "firebase/app";

function errorCode(error: unknown) {
  if (error instanceof FirebaseError) {
    return error.code;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }

  return undefined;
}

export function getFirebaseErrorMessage(error: unknown) {
  switch (errorCode(error)) {
    case "auth/email-already-in-use":
      return "Акаунт із таким email уже існує.";
    case "auth/invalid-email":
      return "Перевірте формат email.";
    case "auth/weak-password":
      return "Оберіть пароль щонайменше з 6 символів.";
    case "auth/invalid-credential":
    case "auth/invalid-login-credentials":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Неправильний email або пароль.";
    case "auth/user-disabled":
      return "Цей акаунт вимкнено.";
    case "auth/too-many-requests":
      return "Забагато спроб. Спробуйте трохи пізніше.";
    case "auth/network-request-failed":
    case "unavailable":
      return "Немає з’єднання з Firebase. Перевірте інтернет.";
    case "auth/requires-recent-login":
      return "Для цієї дії потрібно ще раз увійти в акаунт.";
    case "auth/user-mismatch":
      return "Сесія змінилася. Увійдіть ще раз.";
    case "permission-denied":
      return "Firestore відхилив запит. Перевірте правила доступу.";
    case "profile/invalid-data":
      return "Профіль у Firestore має неправильний формат.";
    default:
      return "Не вдалося виконати дію. Спробуйте ще раз.";
  }
}
