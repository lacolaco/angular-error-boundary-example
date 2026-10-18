import { Component } from '@angular/core';
import { Chart } from '../chart';
import { Navigation } from '../navigation';

@Component({
  selector: 'app-retry',
  imports: [Chart, Navigation],
  template: `
    <main>
      <app-navigation />
      @boundary {
        <app-chart />
      } @error {
        <p>The chart could not be displayed. Select another dataset, then try again.</p>
        <button type="button" (click)="$reset()">Try again</button>
      }
    </main>
  `,
})
export class Retry {}
