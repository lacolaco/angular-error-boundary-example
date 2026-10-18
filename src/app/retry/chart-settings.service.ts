import { computed, Injectable, signal } from '@angular/core';

export type SettingsName = 'default' | 'broken';

export interface ChartSettings {
  // The series to draw. 'revenue' and 'orders' exist; any other name is a stale setting.
  series: string[];
}

export const SETTINGS: Record<SettingsName, ChartSettings> = {
  default: { series: ['revenue'] },
  broken: { series: ['refunds'] },
};

export const SETTINGS_NAMES = Object.keys(SETTINGS) as SettingsName[];

@Injectable({ providedIn: 'root' })
export class ChartSettingsService {
  readonly settingsName = signal<SettingsName>('default');
  readonly settings = computed(() => SETTINGS[this.settingsName()]);

  select(name: SettingsName): void {
    this.settingsName.set(name);
  }

  restoreDefaults(): void {
    this.select('default');
  }
}
