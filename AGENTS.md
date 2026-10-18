# AGENTS.md

Guidance for coding agents working in this repository.

## Purpose

This is a demo app that provides sample code for Error Boundary, implemented in Angular v22.2. Write code on the assumption that it will be quoted in an explanation. Focus on showing how Error Boundary behaves, and do not add abstractions or features that the explanation does not need.

The Error Boundary API (`@boundary` / `@error` blocks, `$reset`, and `ErrorHandler.onViewError` with `ErrorDetails`) is new and may be missing from training data. Do not guess the shape or behavior of the API. Check the type definitions and the compiler implementation in `node_modules/@angular/core` and `node_modules/@angular/compiler`, or the official documentation (`search_documentation` in the angular-cli MCP server), before writing code.

## Language

Write everything that is published from this repository in English. This covers:

- Code, including identifiers, comments, and test names
- Documentation such as the README and this file
- Commit messages
- Pull request titles and descriptions
- Comments on pull requests and issues

## Commands

The package manager is npm (`package-lock.json`).

- Dev server: `npm start` (`ng serve`, http://localhost:4200/)
- Build: `npm run build` (production configuration by default)
- Test: `npm test` (Vitest + jsdom, `@angular/build:unit-test`)
  - Run once: `npx ng test --watch=false`
  - A single file: `npx ng test --watch=false --include src/app/chart.spec.ts`
  - Filter by test name: `npx ng test --watch=false --filter '^Chart'`
  - The test build runs the type checker, so a type error in a spec file fails the run.
- Format: `npx prettier --write <path>` (`.prettierrc`: printWidth 100, single quotes, the angular parser for HTML)

No linter is configured.

## Structure

The app uses standalone components only, with no NgModules, and runs zoneless. Components keep their templates and styles inline (`template` / `styles`), not in separate files.

- `src/main.ts` bootstraps with `bootstrapApplication(App, appConfig)`.
- `src/app/app.config.ts` provides the router and the global error listeners.
- `src/app/app.routes.ts` loads each use case page with `loadComponent`. A use case has no routes file of its own; route-level providers go on its entry here.
- The root component (`src/app/app.ts`) holds `<router-outlet />` and renders the controls that the current route lists in `data.controls` (`app.routes.ts`) with `NgComponentOutlet`, so each page shows only the controls it uses. The template of each use case page is the article's code for that use case, character for character: `<app-navigation />` and the `@boundary` block live in the page, and anything the article does not show stays out of the page.
- Each use case has its own directory under `src/app/` with its page component and `*.spec.ts` files that check the behavior.
- The shared parts live directly under `src/app/`:
  - `chart.ts` (`<app-chart />`) takes no inputs. It reads the current dataset from `ChartDataService` and throws while rendering when the data is broken or unsupported.
  - `chart-data.service.ts` holds the datasets (`valid`, `broken`, `unsupported`) and the signal that selects one.
  - `chart-errors.ts` defines `UnsupportedChartDataError`. No page uses it at the moment.
  - `auth.ts` defines `UnauthenticatedError` and `AuthService`. `requireUser()` throws `UnauthenticatedError` when no user is signed in. The error is an app-wide contract, so components never create it themselves and pages may tell it apart.
  - `dataset-switcher.ts` (`<app-dataset-switcher />`) switches the dataset. The fallback and on-view-error routes list it in `data.controls`, so the root component renders it below the routed page, outside every boundary, and it stays usable while the error content is shown.
  - `hide-on-error/banner-config-switcher.ts` (`<app-banner-config-switcher />`) switches the remote config of the campaign banner (`valid` or `broken`). The hide-on-error route lists it in `data.controls`, for the same reason.
  - `retry/chart-settings-switcher.ts` (`<app-chart-settings-switcher />`) switches the saved chart settings (`default` or `broken`). The retry route lists it in `data.controls`, for the same reason.
  - `error-types/session-switcher.ts` (`<app-session-switcher />`) switches the session (`signed-in`, `signed-out`, or `corrupted`). The error-types route lists it in `data.controls`, for the same reason.
  - `navigation.ts` (`<app-navigation />`) lists the links to the use cases. When you add a use case, add a link to its `LINKS` array.
- When you add a use case, also list the controls it needs in the `data.controls` of its route in `app.routes.ts`. Never put a control in the page.
