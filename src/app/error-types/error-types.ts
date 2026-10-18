import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Navigation } from '../navigation';
import { EVENT } from './event';
import { EventTime } from './event-time';

@Component({
  selector: 'app-error-types',
  imports: [DatePipe, EventTime, Navigation],
  template: `
    <main>
      <app-navigation />
      @boundary {
        <app-event-time />
      } @error (let error; when isRangeError(error)) {
        <p>
          The time zone in your profile is invalid. Showing the time in UTC:
          {{ event.startsAt | date: 'MMM d, y, h:mm a' : 'UTC' }}
        </p>
      } @error {
        <p>The event time could not be displayed.</p>
      }
    </main>
  `,
})
export class ErrorTypes {
  readonly isRangeError = (error: unknown) => error instanceof RangeError;
  readonly event = EVENT;
}
