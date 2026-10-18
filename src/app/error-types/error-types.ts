import { Component } from '@angular/core';
import { Chart } from '../chart';
import { UnsupportedChartDataError } from '../chart-errors';
import { Navigation } from '../navigation';

@Component({
  selector: 'app-error-types',
  imports: [Navigation, Chart],
  template: `
    <main>
      <app-navigation />
      @boundary {
        <app-chart />
      } @error (let error; when isUnsupportedChartData(error)) {
        <p>This data format is not supported. Select another dataset.</p>
      } @error {
        <p>The chart could not be displayed.</p>
        <button type="button" (click)="$reset()">Try again</button>
      }
    </main>
  `,
})
export class ErrorTypes {
  readonly isUnsupportedChartData = (error: unknown) => error instanceof UnsupportedChartDataError;
}
