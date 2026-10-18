import { ErrorHandler } from '@angular/core';
import { Routes } from '@angular/router';
import { DatasetSwitcher } from './dataset-switcher';
import { SessionSwitcher } from './error-types/session-switcher';
import { BannerConfigSwitcher } from './hide-on-error/banner-config-switcher';
import { AppErrorHandler } from './on-view-error/app-error-handler';
import { ChartSettingsSwitcher } from './retry/chart-settings-switcher';

// `data.controls` lists the components that break the page's data or settings. The root
// component renders them outside the page, so a page shows only the controls it uses.
export const routes: Routes = [
  {
    path: 'fallback',
    loadComponent: () => import('./fallback/fallback').then((m) => m.Fallback),
    data: { controls: [DatasetSwitcher] },
  },
  {
    path: 'hide-on-error',
    loadComponent: () => import('./hide-on-error/hide-on-error').then((m) => m.HideOnError),
    data: { controls: [BannerConfigSwitcher] },
  },
  {
    path: 'retry',
    loadComponent: () => import('./retry/retry').then((m) => m.Retry),
    data: { controls: [ChartSettingsSwitcher] },
  },
  {
    path: 'error-types',
    loadComponent: () => import('./error-types/error-types').then((m) => m.ErrorTypes),
    data: { controls: [SessionSwitcher] },
  },
  {
    path: 'on-view-error',
    loadComponent: () => import('./on-view-error/on-view-error').then((m) => m.OnViewError),
    data: { controls: [DatasetSwitcher] },
    // Providing the handler on the route keeps the other use cases on the default ErrorHandler.
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }],
  },
];
