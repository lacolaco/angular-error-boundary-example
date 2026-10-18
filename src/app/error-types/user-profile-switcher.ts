import { Component, inject } from '@angular/core';
import { PROFILE_NAMES, UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile-switcher',
  template: `
    <fieldset>
      <legend>User profile</legend>
      @for (name of names; track name) {
        <button
          type="button"
          [attr.aria-pressed]="name === userProfile.profileName()"
          (click)="userProfile.select(name)"
        >
          {{ name }}
        </button>
      }
    </fieldset>
  `,
})
export class UserProfileSwitcher {
  protected readonly userProfile = inject(UserProfileService);
  protected readonly names = PROFILE_NAMES;
}
