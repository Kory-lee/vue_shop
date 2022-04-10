import type { GlobalIconConfig } from '/@/config-provider/src/internal-interface';

import { defineComponent, inject } from 'vue';
import { upperFirst } from 'lodash-es';
import { configProviderInjectionKey } from '/@/config-provider/src/ConfigProvider';

export default function replaceable(name: keyof GlobalIconConfig, icon: JSX.Element) {
  const KConfigProvider = inject(configProviderInjectionKey, null);
  return defineComponent({
    name: upperFirst(name),
    setup() {
      return () => {
        const iconOverride = KConfigProvider?.mergedIconsRef.value?.[name];
        return iconOverride ? iconOverride() : icon;
      };
    },
  });
}
