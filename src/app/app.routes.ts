import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'retry', loadComponent: () => import('./retry/retry').then((m) => m.Retry) },
];
