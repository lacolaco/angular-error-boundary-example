import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'on-view-error',
    loadChildren: () => import('./on-view-error/on-view-error.routes').then((m) => m.routes),
  },
];
