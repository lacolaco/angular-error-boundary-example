import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'fallback', loadComponent: () => import('./fallback/fallback').then((m) => m.Fallback) },
  { path: 'retry', loadComponent: () => import('./retry/retry').then((m) => m.Retry) },
  {
    path: 'error-types',
    loadComponent: () => import('./error-types/error-types').then((m) => m.ErrorTypes),
  },
];
