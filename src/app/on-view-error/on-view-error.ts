import { Component } from '@angular/core';
import { Chart } from '../chart';
import { Navigation } from '../navigation';

@Component({
  selector: 'app-on-view-error',
  imports: [Chart, Navigation],
  template: `
    <main>
      <app-navigation />
      @boundary {
        <app-chart />
      } @error {
        <p>The chart could not be displayed.</p>
      }
    </main>
  `,
})
export class OnViewError {}
