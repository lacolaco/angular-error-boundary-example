import { NgComponentOutlet } from '@angular/common';
import { Component, inject, Type } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  imports: [RouterOutlet, NgComponentOutlet],
  selector: 'app-root',
  template: `
    <router-outlet />
    @for (control of controls(); track control) {
      <ng-container *ngComponentOutlet="control" />
    }
  `,
})
export class App {
  private readonly router = inject(Router);

  // The controls that the current page declares in its route `data`. They are rendered here,
  // outside the page, so they stay usable while a boundary shows its error content.
  protected readonly controls = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((): Type<unknown>[] => {
        let route = this.router.routerState.snapshot.root;
        while (route.firstChild) route = route.firstChild;
        return route.data['controls'] ?? [];
      }),
    ),
    { initialValue: [] },
  );
}
