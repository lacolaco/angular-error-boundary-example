import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'error-types',
    loadComponent: () => import('./error-types/error-types').then((m) => m.ErrorTypes),
  },
];
