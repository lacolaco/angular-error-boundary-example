import { Component, computed, inject } from '@angular/core';
import { EVENT } from './event';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-event-time',
  template: `
    <h2>Next event</h2>
    <p>{{ event.title }}: {{ startsAt() }}</p>
  `,
})
export class EventTime {
  protected readonly event = EVENT;
  private readonly userProfile = inject(UserProfileService);

  // The time zone from the server is passed as is. An invalid name throws a RangeError here.
  protected readonly startsAt = computed(() =>
    new Intl.DateTimeFormat('en-US', {
      timeZone: this.userProfile.profile()!.timeZone,
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(EVENT.startsAt),
  );
}
