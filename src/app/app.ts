import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatasetSwitcher } from './dataset-switcher';
import { BannerConfigSwitcher } from './hide-on-error/banner-config-switcher';
import { UserProfileSwitcher } from './error-types/user-profile-switcher';
import { ChartSettingsSwitcher } from './retry/chart-settings-switcher';

@Component({
  imports: [
    RouterOutlet,
    DatasetSwitcher,
    BannerConfigSwitcher,
    ChartSettingsSwitcher,
    UserProfileSwitcher,
  ],
  selector: 'app-root',
  template: `
    <router-outlet />
    <app-dataset-switcher />
    <app-banner-config-switcher />
    <app-chart-settings-switcher />
    <app-user-profile-switcher />
  `,
})
export class App {}
