import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'fallback', loadComponent: () => import('./fallback/fallback').then((m) => m.Fallback) },
];
