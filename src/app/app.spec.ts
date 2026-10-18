import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  it('renders the switchers outside the routed page', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('router-outlet + app-dataset-switcher')).not.toBeNull();
    expect(
      element.querySelector('app-dataset-switcher + app-banner-config-switcher'),
    ).not.toBeNull();
    expect(
      element.querySelector('app-banner-config-switcher + app-chart-settings-switcher'),
    ).not.toBeNull();
    expect(
      element.querySelector('app-chart-settings-switcher + app-user-profile-switcher'),
    ).not.toBeNull();
  });
});
