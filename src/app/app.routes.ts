import { ErrorHandler } from '@angular/core';
import { Routes } from '@angular/router';
import { AppErrorHandler } from './on-view-error/app-error-handler';

export const routes: Routes = [
  {
    path: 'on-view-error',
    loadComponent: () => import('./on-view-error/on-view-error').then((m) => m.OnViewError),
    // Providing the handler on the route keeps the other use cases on the default ErrorHandler.
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }],
  },
];
