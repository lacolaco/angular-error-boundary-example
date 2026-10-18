import { Component } from '@angular/core';
import { Chart } from '../chart';
import { DatasetSwitcher } from '../dataset-switcher';
import { Navigation } from '../navigation';

@Component({
  selector: 'app-on-view-error',
  imports: [Chart, DatasetSwitcher, Navigation],
  template: `
    <main>
      <app-navigation />
      <app-dataset-switcher />
      @boundary {
        <app-chart />
      } @error {
        <p>The chart could not be displayed.</p>
      }
    </main>
  `,
})
export class OnViewError {}
