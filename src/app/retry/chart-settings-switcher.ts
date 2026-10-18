import { Component, inject } from '@angular/core';
import { ChartSettingsService, SETTINGS_NAMES } from './chart-settings.service';

@Component({
  selector: 'app-chart-settings-switcher',
  template: `
    <fieldset>
      <legend>Chart settings</legend>
      @for (name of names; track name) {
        <button
          type="button"
          [attr.aria-pressed]="name === chartSettings.settingsName()"
          (click)="chartSettings.select(name)"
        >
          {{ name }}
        </button>
      }
    </fieldset>
  `,
})
export class ChartSettingsSwitcher {
  protected readonly chartSettings = inject(ChartSettingsService);
  protected readonly names = SETTINGS_NAMES;
}
