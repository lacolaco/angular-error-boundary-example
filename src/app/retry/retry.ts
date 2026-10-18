import { Component, inject } from '@angular/core';
import { Navigation } from '../navigation';
import { ChartSettingsService } from './chart-settings.service';
import { SeriesChart } from './series-chart';

@Component({
  selector: 'app-retry',
  imports: [Navigation, SeriesChart],
  template: `
    <main>
      <app-navigation />
      @boundary {
        <app-series-chart />
      } @error {
        <p>The chart settings are invalid.</p>
        <button type="button" (click)="restoreDefaults($reset)">Restore default settings</button>
      }
    </main>
  `,
})
export class Retry {
  private readonly chartSettings = inject(ChartSettingsService);

  restoreDefaults(reset: () => void): void {
    this.chartSettings.restoreDefaults();
    reset();
  }
}
