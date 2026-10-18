import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NavigationLink {
  label: string;
  path: string;
}

// Add one entry per use case. Each use case page renders `<app-navigation />` itself.
const LINKS: NavigationLink[] = [{ label: 'Retry', path: '/retry' }];

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  template: `
    <nav>
      <ul>
        @for (link of links; track link.path) {
          <li>
            <a [routerLink]="link.path">{{ link.label }}</a>
          </li>
        }
      </ul>
    </nav>
  `,
})
export class Navigation {
  protected readonly links = LINKS;
}
