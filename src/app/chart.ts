import { Component, computed, inject } from '@angular/core';
import { ChartDataService } from './chart-data.service';
import { UnsupportedChartDataError } from './chart-errors';

@Component({
  selector: 'app-chart',
  template: `
    <div class="chart" role="img" aria-label="Bar chart">
      @for (bar of bars(); track $index) {
        <div class="bar" [style.height.%]="bar"></div>
      }
    </div>
  `,
  styles: `
    .chart {
      display: flex;
      align-items: flex-end;
      gap: 0.5rem;
      height: 10rem;
    }
    .bar {
      width: 2rem;
      background: steelblue;
    }
  `,
})
export class Chart {
  private readonly chartData = inject(ChartDataService);

  // Reading this computed throws while the template is rendered.
  protected readonly bars = computed(() => {
    const { format, values } = this.chartData.data();
    if (format !== 'bar') {
      throw new UnsupportedChartDataError(`Unsupported chart format: ${format}`);
    }
    // Throws a TypeError when `values` is null.
    const max = Math.max(...values!);
    return values!.map((value) => (value / max) * 100);
  });
}
