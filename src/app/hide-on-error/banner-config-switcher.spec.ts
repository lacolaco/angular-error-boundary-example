import { TestBed } from '@angular/core/testing';
import { BannerConfigSwitcher } from './banner-config-switcher';
import { RemoteConfigService } from './remote-config.service';

describe('BannerConfigSwitcher', () => {
  it('selects the config of the clicked button', () => {
    const fixture = TestBed.createComponent(BannerConfigSwitcher);
    fixture.detectChanges();
    const service = TestBed.inject(RemoteConfigService);
    expect(service.configName()).toBe('valid');

    const buttons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    );
    buttons.find((button) => button.textContent?.trim() === 'broken')!.click();
    expect(service.configName()).toBe('broken');

    buttons.find((button) => button.textContent?.trim() === 'valid')!.click();
    expect(service.configName()).toBe('valid');
  });
});
