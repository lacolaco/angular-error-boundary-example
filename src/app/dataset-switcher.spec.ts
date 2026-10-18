import { TestBed } from '@angular/core/testing';
import { ChartDataService } from './chart-data.service';
import { DatasetSwitcher } from './dataset-switcher';

describe('DatasetSwitcher', () => {
  it('selects the dataset of the clicked button', () => {
    const fixture = TestBed.createComponent(DatasetSwitcher);
    fixture.detectChanges();
    const service = TestBed.inject(ChartDataService);
    expect(service.datasetName()).toBe('valid');

    const buttons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    );
    buttons.find((button) => button.textContent?.trim() === 'broken')!.click();
    expect(service.datasetName()).toBe('broken');

    buttons.find((button) => button.textContent?.trim() === 'unsupported')!.click();
    expect(service.datasetName()).toBe('unsupported');
  });
});
