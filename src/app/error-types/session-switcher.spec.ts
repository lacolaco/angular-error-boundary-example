import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth';
import { SessionSwitcher } from './session-switcher';

describe('SessionSwitcher', () => {
  it('selects the session of the clicked button', () => {
    const fixture = TestBed.createComponent(SessionSwitcher);
    fixture.detectChanges();
    const auth = TestBed.inject(AuthService);
    expect(auth.sessionName()).toBe('signed-in');

    const buttons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    );
    buttons.find((button) => button.textContent?.trim() === 'signed-out')!.click();
    expect(auth.sessionName()).toBe('signed-out');

    buttons.find((button) => button.textContent?.trim() === 'corrupted')!.click();
    expect(auth.sessionName()).toBe('corrupted');
  });
});
