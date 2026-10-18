import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'retry',
    loadChildren: () => import('./retry/retry.routes').then((m) => m.routes),
  },
];
