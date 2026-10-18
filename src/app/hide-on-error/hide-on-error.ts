import { Component } from '@angular/core';
import { Chart } from '../chart';
import { Navigation } from '../navigation';
import { CampaignBanner } from './campaign-banner';

@Component({
  selector: 'app-hide-on-error',
  imports: [CampaignBanner, Chart, Navigation],
  template: `
    <main>
      <app-navigation />
      @boundary {
        <app-campaign-banner />
      } @error {}
      <app-chart />
    </main>
  `,
})
export class HideOnError {}
