const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LoginFieldErrors = Partial<
  Record<"email" | "password", string>
>;

export type RegistrationFieldErrors = Partial<
  Record<"email" | "password" | "passwordConfirmation", string>
>;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function emailError(email: string) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return "Введіть email.";
  }

  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return "Перевірте формат email.";
  }

  return undefined;
}

export function validateLogin(
  email: string,
  password: string,
): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  const currentEmailError = emailError(email);

  if (currentEmailError) {
    errors.email = currentEmailError;
  }

  if (!password) {
    errors.password = "Введіть пароль.";
  }

  return errors;
}

export function validateRegistration(
  email: string,
  password: string,
  passwordConfirmation: string,
): RegistrationFieldErrors {
  const errors: RegistrationFieldErrors = {};
  const currentEmailError = emailError(email);

  if (currentEmailError) {
    errors.email = currentEmailError;
  }

  if (!password) {
    errors.password = "Введіть пароль.";
  } else if (password.length < 6) {
    errors.password = "Пароль має містити щонайменше 6 символів.";
  }

  if (!passwordConfirmation) {
    errors.passwordConfirmation = "Повторіть пароль.";
  } else if (passwordConfirmation !== password) {
    errors.passwordConfirmation = "Паролі не збігаються.";
  }

  return errors;
}

export function validateResetEmail(email: string): LoginFieldErrors {
  const error = emailError(email);
  return error ? { email: error } : {};
}

export function hasFieldErrors(errors: object) {
  return Object.keys(errors).length > 0;
}
