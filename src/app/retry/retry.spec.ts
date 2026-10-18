import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChartDataService } from '../chart-data.service';
import { Retry } from './retry';

describe('Retry', () => {
  let fixture: ComponentFixture<Retry>;
  let chartData: ChartDataService;

  function text(): string {
    return fixture.nativeElement.textContent;
  }

  function hasChart(): boolean {
    return fixture.nativeElement.querySelector('app-chart') !== null;
  }

  function clickTryAgain(): void {
    const button = [...fixture.nativeElement.querySelectorAll('button')].find(
      (b: HTMLButtonElement) => b.textContent?.trim() === 'Try again',
    );
    button.click();
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    chartData = TestBed.inject(ChartDataService);
    fixture = TestBed.createComponent(Retry);
    await fixture.whenStable();
  });

  it('renders the chart for the valid dataset', () => {
    expect(hasChart()).toBe(true);
    expect(text()).not.toContain('The chart could not be displayed.');
  });

  it('shows the error content when the dataset becomes broken', async () => {
    chartData.select('broken');
    await fixture.whenStable();

    expect(hasChart()).toBe(false);
    expect(text()).toContain('The chart could not be displayed.');
  });

  it('keeps showing the error content after the dataset is fixed until the error is reset', async () => {
    chartData.select('broken');
    await fixture.whenStable();

    chartData.select('valid');
    await fixture.whenStable();

    expect(hasChart()).toBe(false);
    expect(text()).toContain('The chart could not be displayed.');
  });

  it('renders the chart again when "Try again" is clicked after the dataset is fixed', async () => {
    chartData.select('broken');
    await fixture.whenStable();
    chartData.select('valid');
    await fixture.whenStable();

    clickTryAgain();
    await fixture.whenStable();

    expect(hasChart()).toBe(true);
    expect(fixture.nativeElement.querySelectorAll('.bar')).toHaveLength(4);
    expect(text()).not.toContain('The chart could not be displayed.');
  });

  it('shows the error content again when "Try again" is clicked while the dataset is still broken', async () => {
    chartData.select('broken');
    await fixture.whenStable();

    clickTryAgain();
    await fixture.whenStable();

    expect(hasChart()).toBe(false);
    expect(text()).toContain('The chart could not be displayed.');
    expect(text()).toContain('Try again');
  });
});
