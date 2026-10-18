import { Component } from '@angular/core';

@Component({
  selector: 'app-kpi-summary',
  template: `
    <h2>KPIs</h2>
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
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      margin: 0;
    }
    dt {
      font-size: 0.85rem;
      color: #57606a;
    }
    dd {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
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
