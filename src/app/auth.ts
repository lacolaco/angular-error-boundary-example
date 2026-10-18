import { computed, Injectable, signal } from '@angular/core';

// The app-wide contract for "there is no signed-in user". Pages may tell it apart from other errors.
export class UnauthenticatedError extends Error {}

export interface User {
  id: string;
  name: string;
  plan: string;
}

export type SessionName = 'signed-in' | 'signed-out' | 'corrupted';

export const SESSIONS: Record<SessionName, User | null> = {
  'signed-in': { id: 'u1', name: 'Ada', plan: 'pro' },
  'signed-out': null,
  // A user object that lost its `plan`, as a damaged stored session would.
  corrupted: { id: 'u1', name: 'Ada' } as unknown as User,
};

export const SESSION_NAMES = Object.keys(SESSIONS) as SessionName[];

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly sessionName = signal<SessionName>('signed-in');
  // In a real app, a `storage` event from a logout in another tab would update this signal.
  readonly user = computed(() => SESSIONS[this.sessionName()]);

  select(name: SessionName): void {
    this.sessionName.set(name);
  }

  requireUser(): User {
    const user = this.user();
    if (user === null) {
      throw new UnauthenticatedError('No user is signed in.');
    }
    return user;
  }
}
