import { computed, Injectable, signal } from '@angular/core';

export type ConfigName = 'valid' | 'broken';

export interface CampaignConfig {
  experiment: string;
  // 'a' and 'b' are known variants. Any other value is a config the banner cannot render.
  variant: string;
}

export const CONFIGS: Record<ConfigName, CampaignConfig> = {
  valid: { experiment: 'spring-campaign', variant: 'a' },
  broken: { experiment: 'spring-campaign', variant: 'c' },
};

export const CONFIG_NAMES = Object.keys(CONFIGS) as ConfigName[];

@Injectable({ providedIn: 'root' })
export class RemoteConfigService {
  readonly configName = signal<ConfigName>('valid');
  readonly config = computed(() => CONFIGS[this.configName()]);

  select(name: ConfigName): void {
    this.configName.set(name);
  }
}
