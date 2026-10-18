import { TestBed } from '@angular/core/testing';
import { AuthService, UnauthenticatedError } from './auth';

describe('AuthService', () => {
  it('throws UnauthenticatedError from requireUser when nobody is signed in', () => {
    const auth = TestBed.inject(AuthService);
    auth.select('signed-out');

    expect(() => auth.requireUser()).toThrow(UnauthenticatedError);
  });

  it('returns the user from requireUser when someone is signed in', () => {
    const auth = TestBed.inject(AuthService);
    auth.select('signed-in');

    expect(auth.requireUser()).toEqual({ id: 'u1', name: 'Ada', plan: 'pro' });
  });
});
