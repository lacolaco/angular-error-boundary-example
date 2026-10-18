import { TestBed } from '@angular/core/testing';
import { UserProfileService } from './user-profile.service';
import { UserProfileSwitcher } from './user-profile-switcher';

describe('UserProfileSwitcher', () => {
  it('selects the profile of the clicked button', () => {
    const fixture = TestBed.createComponent(UserProfileSwitcher);
    fixture.detectChanges();
    const service = TestBed.inject(UserProfileService);
    expect(service.profileName()).toBe('valid');

    const buttons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    );
    buttons.find((button) => button.textContent?.trim() === 'invalid-time-zone')!.click();
    expect(service.profileName()).toBe('invalid-time-zone');

    buttons.find((button) => button.textContent?.trim() === 'missing-time-zone')!.click();
    expect(service.profileName()).toBe('missing-time-zone');
  });
});
