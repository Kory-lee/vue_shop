import { computed } from 'vue';
import { KConfigProvider } from '../../src';

const configProviderRef = computed(() => KConfigProvider);
export function siteSetup() {
  return { configProvider: configProviderRef };
}
