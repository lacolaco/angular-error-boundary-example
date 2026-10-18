import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatasetSwitcher } from './dataset-switcher';
import { BannerConfigSwitcher } from './hide-on-error/banner-config-switcher';

@Component({
  imports: [RouterOutlet, DatasetSwitcher, BannerConfigSwitcher],
  selector: 'app-root',
  template: `
    <router-outlet />
    <app-dataset-switcher />
    <app-banner-config-switcher />
  `,
})
export class App {}
