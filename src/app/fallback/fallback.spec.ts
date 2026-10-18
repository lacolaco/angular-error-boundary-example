import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { ChartDataService, DatasetName } from '../chart-data.service';
import { routes } from './fallback.routes';

const MESSAGE = 'The chart could not be displayed.';

describe('Fallback page', () => {
  async function navigate(dataset: DatasetName) {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'fallback', children: routes }])],
    });
    TestBed.inject(ChartDataService).select(dataset);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/fallback');
    return harness;
  }

  function expectErrorContent(element: HTMLElement) {
    expect(element.querySelector('.chart')).toBeNull();
    expect(element.querySelector('p')?.textContent).toBe(MESSAGE);
    expect(element.querySelector('nav')).not.toBeNull();
    expect(element.querySelector('fieldset')).not.toBeNull();
  }

  it('renders the chart for the valid dataset', async () => {
    const harness = await navigate('valid');
    const element: HTMLElement = harness.routeNativeElement!;

    expect(element.querySelectorAll('.bar')).toHaveLength(4);
    expect(element.textContent).not.toContain(MESSAGE);
  });

  it.each(['broken', 'unsupported'] as const)(
    'shows the @error content for the %s dataset and keeps the page chrome',
    async (dataset) => {
      const harness = await navigate(dataset);

      expectErrorContent(harness.routeNativeElement!);
    },
  );

  it('switches to the @error content when the data breaks after the chart is displayed', async () => {
    const harness = await navigate('valid');
    const element: HTMLElement = harness.routeNativeElement!;
    expect(element.querySelector('.chart')).not.toBeNull();

    TestBed.inject(ChartDataService).select('broken');
    harness.detectChanges();

    expectErrorContent(element);
  });
});
