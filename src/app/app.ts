import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatasetSwitcher } from './dataset-switcher';
import { SessionSwitcher } from './error-types/session-switcher';
import { BannerConfigSwitcher } from './hide-on-error/banner-config-switcher';
import { ChartSettingsSwitcher } from './retry/chart-settings-switcher';

@Component({
  imports: [
    RouterOutlet,
    DatasetSwitcher,
    BannerConfigSwitcher,
    ChartSettingsSwitcher,
    SessionSwitcher,
  ],
  selector: 'app-root',
  template: `
    <router-outlet />
    <app-dataset-switcher />
    <app-banner-config-switcher />
    <app-chart-settings-switcher />
    <app-session-switcher />
  `,
})
export class App {}
