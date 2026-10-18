import { ErrorHandler } from '@angular/core';
import { Routes } from '@angular/router';
import { AppErrorHandler } from './app-error-handler';
import { OnViewError } from './on-view-error';

// Providing the handler on the route keeps the other use cases on the default ErrorHandler.
export const routes: Routes = [
  {
    path: '',
    component: OnViewError,
    providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }],
  },
];
