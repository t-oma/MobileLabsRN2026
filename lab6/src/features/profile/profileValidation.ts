import type { UserProfile } from "@/features/profile/profileService";

export type ProfileFieldErrors = Partial<
  Record<"name" | "age" | "city", string>
>;

export function validateProfile(
  name: string,
  age: string,
  city: string,
): ProfileFieldErrors {
  const errors: ProfileFieldErrors = {};
  const normalizedAge = age.trim();

  if (!name.trim()) {
    errors.name = "Введіть ім’я.";
  }

  if (!normalizedAge) {
    errors.age = "Введіть вік.";
  } else if (!/^\d+$/.test(normalizedAge)) {
    errors.age = "Вік має бути цілим числом.";
  } else {
    const numericAge = Number(normalizedAge);

    if (numericAge < 1 || numericAge > 120) {
      errors.age = "Вік має бути від 1 до 120 років.";
    }
  }

  if (!city.trim()) {
    errors.city = "Введіть місто.";
  }

  return errors;
}

export function normalizeProfile(
  name: string,
  age: string,
  city: string,
): UserProfile {
  return {
    name: name.trim(),
    age: Number(age.trim()),
    city: city.trim(),
  };
}
