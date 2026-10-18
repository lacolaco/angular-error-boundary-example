import { Component, inject } from '@angular/core';
import { CONFIG_NAMES, RemoteConfigService } from './remote-config.service';

@Component({
  selector: 'app-banner-config-switcher',
  template: `
    <fieldset>
      <legend>Banner config</legend>
      @for (name of names; track name) {
        <button
          type="button"
          [attr.aria-pressed]="name === remoteConfig.configName()"
          (click)="remoteConfig.select(name)"
        >
          {{ name }}
        </button>
      }
    </fieldset>
  `,
})
export class BannerConfigSwitcher {
  protected readonly remoteConfig = inject(RemoteConfigService);
  protected readonly names = CONFIG_NAMES;
}
