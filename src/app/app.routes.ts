import { ErrorHandler } from '@angular/core';
import { Routes } from '@angular/router';
import { AppErrorHandler } from './on-view-error/app-error-handler';

export const routes: Routes = [
  { path: 'fallback', loadComponent: () => import('./fallback/fallback').then((m) => m.Fallback) },
  { path: 'retry', loadComponent: () => import('./retry/retry').then((m) => m.Retry) },
  {
    path: 'error-types',
    loadComponent: () => import('./error-types/error-types').then((m) => m.ErrorTypes),
  },
  {
    path: 'on-view-error',
    loadComponent: () => import('./on-view-error/on-view-error').then((m) => m.OnViewError),
    // Providing the handler on the route keeps the other use cases on the default ErrorHandler.
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }],
  },
];
