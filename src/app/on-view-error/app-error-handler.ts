import { ErrorHandler, Injectable } from '@angular/core';
import type { ErrorDetails } from '@angular/core';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    console.error(error);
  }

  onViewError(error: Error, details: ErrorDetails): void {
    console.error('View error caught by a boundary', error, details);
  }
}
