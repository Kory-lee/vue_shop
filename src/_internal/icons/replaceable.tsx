import { defineComponent } from 'vue';
import { GlobalIconConfig } from '/@/config-provider/src/internal-interface';
import { upperFirst } from 'lodash-es';
import useConfig from '/@/_mixins/use-config';

export default function replaceable(name: keyof GlobalIconConfig, icon: JSX.Element) {
  return defineComponent({
    name: upperFirst(name),
    setup() {
      return () => {
        const { KConfigProvider } = useConfig();
        const iconOverride = KConfigProvider?.mergedIconsRef.value?.[name];
        return iconOverride ? iconOverride() : icon;
      };
    },
  });
}
