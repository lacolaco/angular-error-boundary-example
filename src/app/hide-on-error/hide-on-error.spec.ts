import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';
import { Chart } from '../chart';
import { CampaignBanner } from './campaign-banner';
import { ConfigName, RemoteConfigService } from './remote-config.service';

describe('Hide on error page', () => {
  async function navigate(config: ConfigName) {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    TestBed.inject(RemoteConfigService).select(config);
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/hide-on-error');
    return harness;
  }

  function expectBannerHidden(element: HTMLElement) {
    expect(element.querySelector('app-campaign-banner')).toBeNull();
    expect(element.textContent).not.toContain('Spring sale');
    expect(element.textContent).not.toContain('Unknown variant');
    expect(element.querySelector('app-kpi-summary')?.textContent).toContain('Revenue');
    expect(element.querySelector('nav')).not.toBeNull();
  }

  it('renders the banner and the KPIs for the valid config', async () => {
    const harness = await navigate('valid');
    const element: HTMLElement = harness.routeNativeElement!;

    expect(element.querySelector('app-campaign-banner')?.textContent).toContain('Spring sale');
    expect(element.querySelector('app-kpi-summary')?.textContent).toContain('Revenue');
    expect(element.querySelector('nav')).not.toBeNull();
  });

  it('hides only the banner for the broken config, without any message', async () => {
    const harness = await navigate('broken');

    expectBannerHidden(harness.routeNativeElement!);
  });

  it('hides only the banner when the config breaks after it is displayed', async () => {
    const harness = await navigate('valid');
    const element: HTMLElement = harness.routeNativeElement!;
    expect(element.querySelector('app-campaign-banner')).not.toBeNull();

    TestBed.inject(RemoteConfigService).select('broken');
    harness.detectChanges();

    expectBannerHidden(element);
  });

  it('keeps the banner hidden when the config is fixed, because the error state remains', async () => {
    const harness = await navigate('valid');
    const element: HTMLElement = harness.routeNativeElement!;
    const remoteConfig = TestBed.inject(RemoteConfigService);

    remoteConfig.select('broken');
    harness.detectChanges();
    remoteConfig.select('valid');
    harness.detectChanges();

    expectBannerHidden(element);
  });
});

describe('@boundary without @error', () => {
  @Component({
    selector: 'app-without-error-block',
    imports: [CampaignBanner, Chart],
    template: `
      <main>
        @boundary {
          <app-campaign-banner />
        }
        <app-chart />
      </main>
    `,
  })
  class WithoutErrorBlock {}

  it('compiles, but an error in the boundary falls through to the caller', () => {
    TestBed.inject(RemoteConfigService).select('broken');

    expect(() => {
      const fixture = TestBed.createComponent(WithoutErrorBlock);
      fixture.detectChanges();
    }).toThrow(/Unhandled error in @boundary fell through/);
  });
});
