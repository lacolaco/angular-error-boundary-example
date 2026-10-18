import { computed, Injectable, signal } from '@angular/core';

export type DatasetName = 'valid' | 'broken' | 'unsupported';

export interface ChartData {
  format: string;
  // `null` models a payload whose values are missing.
  values: number[] | null;
}

export const DATASETS: Record<DatasetName, ChartData> = {
  valid: { format: 'bar', values: [30, 80, 45, 60] },
  broken: { format: 'bar', values: null },
  unsupported: { format: 'radar', values: [30, 80, 45, 60] },
};

export const DATASET_NAMES = Object.keys(DATASETS) as DatasetName[];

@Injectable({ providedIn: 'root' })
export class ChartDataService {
  readonly datasetName = signal<DatasetName>('valid');
  readonly data = computed(() => DATASETS[this.datasetName()]);

  select(name: DatasetName): void {
    this.datasetName.set(name);
  }
}
