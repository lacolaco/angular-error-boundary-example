# Angular Error Boundary Example

A sample app that shows Error Boundary, introduced in Angular v22.2, through a set of use cases. Each use case has its own directory and its own path, and every path is linked from the navigation at the top of the page.

## Getting started

```bash
npm install
npm start      # http://localhost:4200/
npm test       # Vitest. Run once with: npx ng test --watch=false
```

## Read these first

- `src/app/chart.ts`: `<app-chart />` takes no inputs. It reads the current dataset from `ChartDataService` and throws while the template is rendered when the data is not drawable. This is the component that every use case puts inside a boundary.
- `src/app/chart-data.service.ts`: holds three datasets and the signal that selects one.
  - `valid`: four bars are drawn.
  - `broken`: `values` is `null`, so the chart throws a `TypeError`.
  - `unsupported`: the format is `radar`, so the chart throws an `UnsupportedChartDataError`.
- `src/app/chart-errors.ts`: defines `UnsupportedChartDataError`.
- `src/app/dataset-switcher.ts`: the buttons that switch the dataset. The root component (`src/app/app.ts`) renders it below `<router-outlet />`, so it stays outside every boundary and usable while the `@error` content is shown.
- `src/app/app.config.ts`: nothing is configured for Error Boundary. `@boundary` and `@error` work in a plain application.

## Tour

Every use case page has the same shape: `<app-navigation />` and a `@boundary` block around `<app-chart />` inside `<main>`. Only the `@error` blocks and the error handling differ. In each use case, `*.ts` is the page and `*.spec.ts` checks the behavior. `src/app/app.routes.ts` loads every page with `loadComponent`.

### 1. Showing a fallback

- Open: `/fallback`
- Read: `src/app/fallback/`
- `@boundary` wraps the chart, and `@error` holds the content that replaces the boundary content when something inside it throws. Nothing else is needed.
- Press `broken` or `unsupported`. The chart is replaced with a message, while the navigation and the dataset switcher outside the boundary stay as they are. This also works when the chart is already displayed: the data breaks after the first render, the chart throws during change detection, and the boundary catches it.
- The test checks that the chart is gone and the message is shown for both failing datasets, that the navigation is still rendered, and that switching from `valid` to `broken` after the first render ends up in the `@error` content.

### 2. Retrying with `$reset()`

- Open: `/retry`
- Read: `src/app/retry/`
- The `@error` block has a `Try again` button that calls `$reset()`. It clears the error state of the boundary and renders the boundary content again.
- Press `broken`, then press `valid`. The page still shows the error: fixing the data does not clear the error state by itself. Now press `Try again` and the chart is rendered. Press `broken` and `Try again` instead, and the chart throws again, so the `@error` content comes back.
- The test checks the three cases: the error stays after the dataset is fixed, `$reset()` renders the chart once the dataset is fixed, and `$reset()` ends up in the `@error` content again while the dataset is still broken.

### 3. Choosing the fallback by the error

- Open: `/error-types`
- Read: `src/app/error-types/`
- A boundary can have several `@error` blocks. `@error (let error; when isUnsupportedChartData(error))` binds the thrown error to `error` and shows its content only when the condition is true. The blocks are evaluated from top to bottom, and the last `@error` has no condition and catches everything else.
- `isUnsupportedChartData` is a property of the component that checks `instanceof UnsupportedChartDataError`.
- Press `unsupported`. The specific message appears, without a retry button, because trying again cannot help. Press `broken`. The `TypeError` does not match the condition, so the generic message and the `Try again` button appear.
- The test checks which of the two messages is shown for each dataset, and that the unsupported message and the generic message are never shown together.

### 4. Reporting the error with `onViewError`

- Open: `/on-view-error`
- Read: `src/app/on-view-error/`
- `app-error-handler.ts` implements `ErrorHandler` with `handleError` and also `onViewError(error, details)`. Both send the error to Sentry. `sentry.ts` is a stand-in for `@sentry/angular` that has the same `captureException` call shape but only logs. Its entry in `src/app/app.routes.ts` provides the handler in `providers`, so the other use cases keep the default `ErrorHandler`.
- When a boundary catches an error and the `ErrorHandler` implements `onViewError`, Angular calls `onViewError` and does not call `handleError` for that error. The page itself is the same as the fallback page.
- `onViewError` turns `ErrorDetails` into Sentry tags: `component` is the component that threw (`details.declarationType`, here `app-chart`), and `boundary` is the component that declares the `@boundary` (`details.boundary.type`, here `app-on-view-error`). The tags use the selector from `reflectComponentType` because production builds minify class names.
- Open the browser console, then press `broken` or `unsupported`. `[Sentry] captureException` is logged once with the error and the tags.
- The test checks that the route provides `AppErrorHandler` while the root injector does not, that `onViewError` is not called for the `valid` dataset, that for the failing datasets `onViewError` is called once with the expected error type, `declarationType` and `boundary.type` while `handleError` is not called, and that Sentry receives the error with both tags.
