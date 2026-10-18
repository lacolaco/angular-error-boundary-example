import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'fallback',
    loadChildren: () => import('./fallback/fallback.routes').then((m) => m.routes),
  },
];
