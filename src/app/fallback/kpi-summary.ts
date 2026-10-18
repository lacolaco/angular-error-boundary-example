import { Component } from '@angular/core';

@Component({
  selector: 'app-kpi-summary',
  template: `
    <dl class="kpis">
      @for (kpi of kpis; track kpi.label) {
        <div>
          <dt>{{ kpi.label }}</dt>
          <dd>{{ kpi.value }}</dd>
        </div>
      }
    </dl>
  `,
  styles: `
    .kpis {
      display: flex;
      gap: 2rem;
    }
  `,
})
export class KpiSummary {
  protected readonly kpis = [
    { label: 'Revenue', value: '$12,400' },
    { label: 'Orders', value: '184' },
    { label: 'Conversion rate', value: '3.2%' },
  ];
}
