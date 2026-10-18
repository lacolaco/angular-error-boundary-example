import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'app-account-summary',
  template: `
    <h2>Account</h2>
    <p class="account">{{ account().name }} ({{ account().plan }})</p>
  `,
})
export class AccountSummary {
  private readonly auth = inject(AuthService);
  protected readonly account = computed(() => {
    const user = this.auth.requireUser();
    return { name: user.name, plan: user.plan.toUpperCase() };
  });
}
