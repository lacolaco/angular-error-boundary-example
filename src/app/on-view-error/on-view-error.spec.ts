import { ErrorHandler } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { Chart } from '../chart';
import { ChartDataService, DatasetName } from '../chart-data.service';
import { UnsupportedChartDataError } from '../chart-errors';
import { AppErrorHandler } from './app-error-handler';
import { OnViewError } from './on-view-error';
import { Sentry } from './sentry';
import { routes } from '../app.routes';

describe('onViewError use case', () => {
  async function renderPage(dataset: DatasetName) {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const harness = await RouterTestingHarness.create('/on-view-error');
    TestBed.inject(ChartDataService).select(dataset);
    return harness;
  }

  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  it('provides AppErrorHandler through the route', async () => {
    const harness = await renderPage('valid');

    expect(harness.routeDebugElement?.injector.get(ErrorHandler)).toBeInstanceOf(AppErrorHandler);
    expect(TestBed.inject(ErrorHandler)).not.toBeInstanceOf(AppErrorHandler);
  });

  it('does not call onViewError while the chart is valid', async () => {
    const onViewError = vi.spyOn(AppErrorHandler.prototype, 'onViewError');
    const harness = await renderPage('valid');
    harness.detectChanges();

    expect(onViewError).not.toHaveBeenCalled();
    expect(harness.routeNativeElement?.querySelector('.chart')).not.toBeNull();
  });

  it.each<[DatasetName, new (...args: never[]) => Error]>([
    ['broken', TypeError],
    ['unsupported', UnsupportedChartDataError],
  ])('calls onViewError instead of handleError for the %s dataset', async (dataset, errorType) => {
    const onViewError = vi.spyOn(AppErrorHandler.prototype, 'onViewError');
    const handleError = vi.spyOn(AppErrorHandler.prototype, 'handleError');
    const harness = await renderPage(dataset);
    harness.detectChanges();

    expect(onViewError).toHaveBeenCalledTimes(1);
    const [error, details] = onViewError.mock.calls[0];
    expect(error).toBeInstanceOf(errorType);
    expect(details.declarationType).toBe(Chart);
    expect(details.declarationInstance).toBeInstanceOf(Chart);
    expect(details.boundary?.type).toBe(OnViewError);
    expect(handleError).not.toHaveBeenCalled();
  });

  it.each<DatasetName>(['broken', 'unsupported'])(
    'sends the error to Sentry with the component and the boundary as tags for the %s dataset',
    async (dataset) => {
      const captureException = vi.spyOn(Sentry, 'captureException');
      const harness = await renderPage(dataset);
      harness.detectChanges();

      expect(captureException).toHaveBeenCalledTimes(1);
      expect(captureException).toHaveBeenCalledWith(expect.any(Error), {
        tags: { component: Chart.name, boundary: OnViewError.name },
      });
    },
  );

  it.each<DatasetName>(['broken', 'unsupported'])(
    'shows the @error content for the %s dataset',
    async (dataset) => {
      const harness = await renderPage(dataset);
      harness.detectChanges();

      expect(harness.routeNativeElement?.textContent).toContain(
        'The chart could not be displayed.',
      );
      expect(harness.routeNativeElement?.querySelector('.chart')).toBeNull();
    },
  );
});
