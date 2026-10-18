import { TestBed } from '@angular/core/testing';
import { ChartSettingsSwitcher } from './chart-settings-switcher';
import { ChartSettingsService } from './chart-settings.service';

describe('ChartSettingsSwitcher', () => {
  it('selects the settings of the clicked button', () => {
    const fixture = TestBed.createComponent(ChartSettingsSwitcher);
    fixture.detectChanges();
    const service = TestBed.inject(ChartSettingsService);
    expect(service.settingsName()).toBe('default');

    const buttons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    );
    buttons.find((button) => button.textContent?.trim() === 'broken')!.click();
    expect(service.settingsName()).toBe('broken');

    buttons.find((button) => button.textContent?.trim() === 'default')!.click();
    expect(service.settingsName()).toBe('default');
  });
});
