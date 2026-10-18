// A stand-in for `@sentry/angular`. It has the same call shape as `Sentry.captureException`
// but only logs, so the sample runs without a Sentry project.
export const Sentry = {
  captureException(
    exception: unknown,
    captureContext?: { tags?: Record<string, string>; extra?: Record<string, unknown> },
  ): void {
    console.log('[Sentry] captureException', exception, captureContext);
  },
};
