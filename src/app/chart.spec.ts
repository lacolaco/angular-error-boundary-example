import { TestBed } from '@angular/core/testing';
import { Chart } from './chart';
import { ChartDataService } from './chart-data.service';
import { UnsupportedChartDataError } from './chart-errors';

describe('Chart', () => {
  function createChart(dataset: Parameters<ChartDataService['select']>[0]) {
    TestBed.inject(ChartDataService).select(dataset);
    return TestBed.createComponent(Chart);
  }

  it('renders one bar per value for the valid dataset', () => {
    const fixture = createChart('valid');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.bar')).toHaveLength(4);
  });

  it('throws a plain Error while rendering the broken dataset', () => {
    const fixture = createChart('broken');

    expect(() => fixture.detectChanges()).toThrow(Error);
    expect(() => fixture.detectChanges()).not.toThrow(UnsupportedChartDataError);
  });

  it('throws UnsupportedChartDataError while rendering the unsupported dataset', () => {
    const fixture = createChart('unsupported');

    expect(() => fixture.detectChanges()).toThrow(UnsupportedChartDataError);
  });
});
