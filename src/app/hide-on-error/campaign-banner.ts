import { Component, computed, inject } from '@angular/core';
import { RemoteConfigService } from './remote-config.service';

const COPY: Record<string, { heading: string; text: string }> = {
  a: { heading: 'Spring sale', text: 'Take 20% off everything this week.' },
  b: { heading: 'Spring sale', text: 'Free shipping on every order this week.' },
};

@Component({
  selector: 'app-campaign-banner',
  template: `
    <h2>{{ copy().heading }}</h2>
    <p>{{ copy().text }}</p>
  `,
  styles: `
    p {
      margin: 0;
    }
  `,
})
export class CampaignBanner {
  private readonly remoteConfig = inject(RemoteConfigService);

  // Reading this computed throws while the template is rendered when the variant is unknown.
  protected readonly copy = computed(() => {
    const { experiment, variant } = this.remoteConfig.config();
    const copy = COPY[variant];
    if (!copy) {
      throw new Error(`Unknown variant "${variant}" in experiment "${experiment}"`);
    }
    return copy;
  });
}
