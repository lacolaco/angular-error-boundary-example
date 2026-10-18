import { ErrorHandler, Injectable } from '@angular/core';
import type { ErrorDetails } from '@angular/core';
import { Sentry } from './sentry';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    Sentry.captureException(error);
  }

  onViewError(error: Error, details: ErrorDetails): void {
    Sentry.captureException(error, {
      tags: {
        component: details.declarationType.name,
        boundary: details.boundary?.type.name ?? 'none',
      },
    });
  }
}
