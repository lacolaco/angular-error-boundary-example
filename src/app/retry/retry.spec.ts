import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ChartSettingsService, SettingsName } from './chart-settings.service';
import { Retry } from './retry';

describe('Retry', () => {
  let fixture: ComponentFixture<Retry>;
  let chartSettings: ChartSettingsService;

  function text(): string {
    return fixture.nativeElement.textContent;
  }

  function hasChart(): boolean {
    return fixture.nativeElement.querySelector('app-series-chart') !== null;
  }

  function hasNavigation(): boolean {
    return fixture.nativeElement.querySelector('app-navigation') !== null;
  }

  function clickRestore(): void {
    const button = [...fixture.nativeElement.querySelectorAll('button')].find(
      (b: HTMLButtonElement) => b.textContent?.trim() === 'Restore default settings',
    );
    button.click();
  }

  async function render(name: SettingsName): Promise<void> {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    chartSettings = TestBed.inject(ChartSettingsService);
    chartSettings.select(name);
    fixture = TestBed.createComponent(Retry);
    await fixture.whenStable();
  }

  it('renders the chart for the default settings', async () => {
    await render('default');

    expect(hasChart()).toBe(true);
    expect(fixture.nativeElement.querySelectorAll('.bar')).toHaveLength(4);
    expect(text()).not.toContain('The chart settings are invalid.');
  });

  it('shows the error content instead of the chart for the broken settings', async () => {
    await render('broken');

    expect(hasChart()).toBe(false);
    expect(text()).toContain('The chart settings are invalid.');
    expect(text()).toContain('Restore default settings');
    expect(hasNavigation()).toBe(true);
  });

  it('restores the default settings and renders the chart when the button is clicked', async () => {
    await render('broken');

    clickRestore();
    await fixture.whenStable();

    expect(chartSettings.settingsName()).toBe('default');
    expect(hasChart()).toBe(true);
    expect(text()).not.toContain('The chart settings are invalid.');
  });

  it('shows the error content when the settings become broken after the first render', async () => {
    await render('default');
    expect(hasChart()).toBe(true);

    chartSettings.select('broken');
    await fixture.whenStable();

    expect(hasChart()).toBe(false);
    expect(text()).toContain('The chart settings are invalid.');
    expect(hasNavigation()).toBe(true);

    clickRestore();
    await fixture.whenStable();

    expect(chartSettings.settingsName()).toBe('default');
    expect(hasChart()).toBe(true);
  });
});
