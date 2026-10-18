import { computed, Injectable, signal } from '@angular/core';

export type ProfileName = 'valid' | 'invalid-time-zone' | 'missing-time-zone';

export interface UserProfile {
  name: string;
  // An IANA time zone name such as 'Asia/Tokyo'.
  timeZone: string;
}

// The profile as received from the server. The client does not validate it.
export const PROFILES: Record<ProfileName, UserProfile | null> = {
  valid: { name: 'Taro', timeZone: 'Asia/Tokyo' },
  // The display name of an option in the profile screen was saved as is.
  'invalid-time-zone': { name: 'Taro', timeZone: 'UTC+9' },
  // The server returned no profile, so reading `timeZone` throws a TypeError.
  'missing-time-zone': null,
};

export const PROFILE_NAMES = Object.keys(PROFILES) as ProfileName[];

@Injectable({ providedIn: 'root' })
export class UserProfileService {
  readonly profileName = signal<ProfileName>('valid');
  readonly profile = computed(() => PROFILES[this.profileName()]);

  select(name: ProfileName): void {
    this.profileName.set(name);
  }
}
