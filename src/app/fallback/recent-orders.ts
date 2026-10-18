import { Component } from '@angular/core';

@Component({
  selector: 'app-recent-orders',
  template: `
    <ul class="orders">
      @for (order of orders; track order.id) {
        <li>{{ order.id }}: {{ order.customer }}, {{ order.total }}</li>
      }
    </ul>
  `,
})
export class RecentOrders {
  protected readonly orders = [
    { id: '#1042', customer: 'Alice', total: '$120' },
    { id: '#1041', customer: 'Bob', total: '$85' },
    { id: '#1040', customer: 'Carol', total: '$240' },
  ];
}
