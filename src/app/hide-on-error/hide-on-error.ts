import { Component } from '@angular/core';
import { KpiSummary } from '../fallback/kpi-summary';
import { Navigation } from '../navigation';
import { CampaignBanner } from './campaign-banner';

@Component({
  selector: 'app-hide-on-error',
  imports: [CampaignBanner, KpiSummary, Navigation],
  template: `
    <main>
      <app-navigation />
      @boundary {
        <app-campaign-banner />
      } @error {}
      <app-kpi-summary />
    </main>
  `,
})
export class HideOnError {}
