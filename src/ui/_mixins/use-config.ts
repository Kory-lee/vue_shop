import { computed, ComputedRef, inject } from 'vue';
import { configProviderInjectionKey } from '../config-provider/src/ConfigProvider';
import { ConfigProviderInjection } from '../config-provider/src/internal-interface';

type UseConfigProps = Readonly<{
  bordered?: boolean;
  [key: string]: unknown;
}>;

export const defaultClsPrefix = `k`;

export default function useConfig(
  props: UseConfigProps,
  options: { defaultBordered?: boolean } = { defaultBordered: true }
): {
  ConfigProvider: ConfigProviderInjection | null;
  mergedBorderedRef: ComputedRef<boolean>;
  mergedClsPrefixRef: ComputedRef<string>;
  namespaceRef: ComputedRef<string | undefined>;
} {
  const ConfigProvider = inject(configProviderInjectionKey, null);
  return {
    ConfigProvider,
    mergedBorderedRef: computed(() => {
      const { bordered } = props;
      if (bordered !== undefined) return bordered;
      return ConfigProvider?.mergedBorderedRef.value ?? options.defaultBordered ?? true;
    }),
    mergedClsPrefixRef: computed(
      () => ConfigProvider?.mergedClsPrefixRef.value || defaultClsPrefix
    ),
    namespaceRef: computed(() => ConfigProvider?.mergedNamespaceRef.value),
  };
}
