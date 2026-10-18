import { Component } from '@angular/core';
import { Chart } from '../chart';
import { Navigation } from '../navigation';
import { KpiSummary } from './kpi-summary';
import { RecentOrders } from './recent-orders';

@Component({
  selector: 'app-fallback',
  imports: [Chart, KpiSummary, Navigation, RecentOrders],
  template: `
    <main>
      <app-navigation />
      @boundary {
        <app-chart />
      } @error {
        <p>The sales chart could not be displayed.</p>
      }
      @boundary {
        <app-kpi-summary />
      } @error {
        <p>The KPIs could not be displayed.</p>
      }
      @boundary {
        <app-recent-orders />
      } @error {
        <p>The recent orders could not be displayed.</p>
      }
    </main>
  `,
})
export class Fallback {}
