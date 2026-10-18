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

The app uses standalone components only, with no NgModules, and runs zoneless.

- `src/main.ts` bootstraps with `bootstrapApplication(App, appConfig)`.
- `src/app/app.config.ts` provides the router and the global error listeners.
- `src/app/app.routes.ts` mounts each use case page.
- `src/app/app.html` only holds `<router-outlet />`. Each use case page renders `<app-navigation />` itself and puts the chart inside the boundary.
- Each use case has its own directory under `src/app/` with its page component, its routes, and `*.spec.ts` files that check the behavior.
- The shared parts live directly under `src/app/`:
  - `chart.ts` (`<app-chart />`) takes no inputs. It reads the current dataset from `ChartDataService` and throws while rendering when the data is broken or unsupported.
  - `chart-data.service.ts` holds the datasets (`valid`, `broken`, `unsupported`) and the signal that selects one.
  - `chart-errors.ts` defines `UnsupportedChartDataError`.
  - `dataset-switcher.ts` (`<app-dataset-switcher />`) switches the dataset. Place it outside the boundary so that it stays usable while the error content is shown.
  - `navigation.ts` (`<app-navigation />`) lists the links to the use cases. When you add a use case, add a link to its `LINKS` array.
