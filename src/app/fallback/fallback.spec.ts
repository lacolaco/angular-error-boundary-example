import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ChartDataService, DatasetName } from '../chart-data.service';
import { routes } from '../app.routes';

const CHART_MESSAGE = 'The sales chart could not be displayed.';
const KPI_MESSAGE = 'The KPIs could not be displayed.';
const ORDERS_MESSAGE = 'The recent orders could not be displayed.';

describe('Fallback page', () => {
  async function navigate(dataset: DatasetName) {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    TestBed.inject(ChartDataService).select(dataset);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/fallback');
    return harness;
  }

  function expectOtherWidgetsIntact(element: HTMLElement) {
    expect(element.querySelector('app-kpi-summary')?.textContent).toContain('Revenue');
    expect(element.querySelector('app-recent-orders')?.textContent).toContain('#1042');
    expect(element.textContent).not.toContain(KPI_MESSAGE);
    expect(element.textContent).not.toContain(ORDERS_MESSAGE);
    expect(element.querySelector('nav')).not.toBeNull();
  }

  function expectChartReplaced(element: HTMLElement) {
    expect(element.querySelector('.chart')).toBeNull();
    expect(element.textContent).toContain(CHART_MESSAGE);
    expectOtherWidgetsIntact(element);
  }

  it('renders all three widgets for the valid dataset', async () => {
    const harness = await navigate('valid');
    const element: HTMLElement = harness.routeNativeElement!;

    expect(element.querySelectorAll('.bar')).toHaveLength(4);
    expectOtherWidgetsIntact(element);
    expect(element.textContent).not.toContain(CHART_MESSAGE);
  });

  it.each(['broken', 'unsupported'] as const)(
    'replaces only the sales chart for the %s dataset',
    async (dataset) => {
      const harness = await navigate(dataset);

      expectChartReplaced(harness.routeNativeElement!);
    },
  );

  it('replaces only the sales chart when the data breaks after it is displayed', async () => {
    const harness = await navigate('valid');
    const element: HTMLElement = harness.routeNativeElement!;
    expect(element.querySelector('.chart')).not.toBeNull();

    TestBed.inject(ChartDataService).select('broken');
    harness.detectChanges();

    expectChartReplaced(element);
  });
});
