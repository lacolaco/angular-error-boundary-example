import { Component, computed, inject } from '@angular/core';
import { ChartSettingsService } from './chart-settings.service';

const SERIES: Record<string, number[]> = {
  revenue: [40, 65, 55, 90],
  orders: [30, 45, 70, 50],
};

@Component({
  selector: 'app-series-chart',
  template: `
    <h2>Sales</h2>
    @for (series of charts(); track series.name) {
      <div class="chart" role="img" [attr.aria-label]="series.name + ' bar chart'">
        @for (bar of series.bars; track $index) {
          <div class="bar" [style.height.%]="bar"></div>
        }
      </div>
    }
  `,
  styles: `
    .chart {
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
      height: 10rem;
    }
    .bar {
      flex: 1;
      max-width: 4rem;
      background: steelblue;
    }
  `,
})
export class SeriesChart {
  private readonly chartSettings = inject(ChartSettingsService);

  // Reading this computed throws while the template is rendered when the saved settings
  // point to a series that no longer exists.
  protected readonly charts = computed(() =>
    this.chartSettings.settings().series.map((name) => {
      const values = SERIES[name];
      if (!values) {
        throw new Error(`Unknown series in the chart settings: ${name}`);
      }
      const max = Math.max(...values);
      return { name, bars: values.map((value) => (value / max) * 100) };
    }),
  );
}
