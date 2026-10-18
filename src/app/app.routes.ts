import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'error-types',
    loadChildren: () => import('./error-types/error-types.routes').then((m) => m.routes),
  },
];
