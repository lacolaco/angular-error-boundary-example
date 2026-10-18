import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChartDataService } from '../chart-data.service';
import { ErrorTypes } from './error-types';

describe('ErrorTypes', () => {
  async function render(dataset: Parameters<ChartDataService['select']>[0]) {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    TestBed.inject(ChartDataService).select(dataset);
    const fixture = TestBed.createComponent(ErrorTypes);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('shows the unsupported format message instead of the generic one', async () => {
    const element = await render('unsupported');

    expect(element.textContent).toContain('This data format is not supported.');
    expect(element.textContent).not.toContain('The chart could not be displayed.');
    expect(element.querySelector('.chart')).toBeNull();
  });

  it('shows the generic message and a Try again button for the broken dataset', async () => {
    const element = await render('broken');

    expect(element.textContent).toContain('The chart could not be displayed.');
    expect(element.textContent).not.toContain('This data format is not supported.');
    expect(element.textContent).toContain('Try again');
  });

  it('shows the chart for the valid dataset', async () => {
    const element = await render('valid');

    expect(element.querySelectorAll('.bar')).toHaveLength(4);
    expect(element.textContent).not.toContain('could not be displayed');
    expect(element.textContent).not.toContain('not supported');
  });
});
