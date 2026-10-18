import { Component } from '@angular/core';
import { UnauthenticatedError } from '../auth';
import { Navigation } from '../navigation';
import { AccountSummary } from './account-summary';

@Component({
  selector: 'app-error-types',
  imports: [Navigation, AccountSummary],
  template: `
    <main>
      <app-navigation />
      @boundary {
        <app-account-summary />
      } @error (let error; when isUnauthenticated(error)) {
        <p>Your session has ended. Sign in again to see your account.</p>
      } @error {
        <p>Your account could not be displayed.</p>
      }
    </main>
  `,
})
export class ErrorTypes {
  readonly isUnauthenticated = (error: unknown) => error instanceof UnauthenticatedError;
}
