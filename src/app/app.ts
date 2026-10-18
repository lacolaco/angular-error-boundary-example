import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DatasetSwitcher } from './dataset-switcher';

@Component({
  imports: [RouterOutlet, DatasetSwitcher],
  selector: 'app-root',
  template: `
    <router-outlet />
    <app-dataset-switcher />
  `,
})
export class App {}
