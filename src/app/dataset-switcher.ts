import { Component, inject } from '@angular/core';
import { ChartDataService, DATASET_NAMES } from './chart-data.service';

@Component({
  selector: 'app-dataset-switcher',
  template: `
    <fieldset>
      <legend>Dataset</legend>
      @for (name of names; track name) {
        <button
          type="button"
          [attr.aria-pressed]="name === chartData.datasetName()"
          (click)="chartData.select(name)"
        >
          {{ name }}
        </button>
      }
    </fieldset>
  `,
})
export class DatasetSwitcher {
  protected readonly chartData = inject(ChartDataService);
  protected readonly names = DATASET_NAMES;
}
