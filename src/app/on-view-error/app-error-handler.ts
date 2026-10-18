import { ErrorHandler, Injectable, reflectComponentType, Type } from '@angular/core';
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
        component: selectorOf(details.declarationType),
        boundary: details.boundary ? selectorOf(details.boundary.type) : 'none',
      },
    });
  }
}

// Class names are minified in production builds, so the selector names the component instead.
function selectorOf(type: Type<unknown>): string {
  return reflectComponentType(type)?.selector ?? type.name;
}
