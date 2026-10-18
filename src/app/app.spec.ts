import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';

const SWITCHERS = [
  'app-dataset-switcher',
  'app-banner-config-switcher',
  'app-chart-settings-switcher',
  'app-session-switcher',
];

describe('App', () => {
  const rendered = (fixture: { nativeElement: HTMLElement }): string[] =>
    SWITCHERS.filter((selector) => fixture.nativeElement.querySelector(selector) !== null);

  it.each([
    ['/fallback', 'app-dataset-switcher'],
    ['/hide-on-error', 'app-banner-config-switcher'],
    ['/retry', 'app-chart-settings-switcher'],
    ['/error-types', 'app-session-switcher'],
    ['/on-view-error', 'app-dataset-switcher'],
  ])('renders only the switcher that %s uses', async (url, selector) => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(App);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(url);
    await fixture.whenStable();

    expect(rendered(fixture)).toEqual([selector]);
  });

  it('renders no switcher before the first navigation', () => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    expect(rendered(fixture)).toEqual([]);
  });
});
