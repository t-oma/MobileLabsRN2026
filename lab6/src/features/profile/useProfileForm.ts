import { useEffect, useState } from "react";

import type { UserProfile } from "@/features/profile/profileService";
import {
  normalizeProfile,
  type ProfileFieldErrors,
  validateProfile,
} from "@/features/profile/profileValidation";

type UseProfileFormOptions = {
  profile: UserProfile | null;
  isProfileLoading: boolean;
  userUid: string;
};

export function useProfileForm({
  profile,
  isProfileLoading,
  userUid,
}: UseProfileFormOptions) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({});
  const [formUserUid, setFormUserUid] = useState<string | null>(null);

  useEffect(() => {
    if (isProfileLoading || formUserUid === userUid) {
      return;
    }

    setName(profile?.name ?? "");
    setAge(profile ? String(profile.age) : "");
    setCity(profile?.city ?? "");
    setFieldErrors({});
    setFormUserUid(userUid);
  }, [formUserUid, isProfileLoading, profile, userUid]);

  const normalizedProfile = normalizeProfile(name, age, city);
  const hasChanges = profile
    ? normalizedProfile.name !== profile.name ||
      normalizedProfile.age !== profile.age ||
      normalizedProfile.city !== profile.city
    : name.trim() !== "" || age.trim() !== "" || city.trim() !== "";

  function validate() {
    const errors = validateProfile(name, age, city);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return null;
    }

    return normalizedProfile;
  }

  return {
    fields: {
      name: {
        error: fieldErrors.name,
        onChangeText: setName,
        value: name,
      },
      age: {
        error: fieldErrors.age,
        onChangeText: setAge,
        value: age,
      },
      city: {
        error: fieldErrors.city,
        onChangeText: setCity,
        value: city,
      },
    },
    hasChanges,
    isReady: !isProfileLoading && formUserUid === userUid,
    validate,
  };
}
