import { Component, inject } from '@angular/core';
import { AuthService, SESSION_NAMES } from '../auth';

@Component({
  selector: 'app-session-switcher',
  template: `
    <fieldset>
      <legend>Session</legend>
      @for (name of names; track name) {
        <button
          type="button"
          [attr.aria-pressed]="name === auth.sessionName()"
          (click)="auth.select(name)"
        >
          {{ name }}
        </button>
      }
    </fieldset>
  `,
})
export class SessionSwitcher {
  protected readonly auth = inject(AuthService);
  protected readonly names = SESSION_NAMES;
}
