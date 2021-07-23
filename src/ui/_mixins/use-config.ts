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
  NConfigProvider: ConfigProviderInjection | null;
  mergedBorderedRef: ComputedRef<boolean>;
  mergedClsPrefixRef: ComputedRef<string>;
  namespaceRef: ComputedRef<string | undefined>;
} {
  const NConfigProvider = inject(configProviderInjectionKey, null);
  return {
    NConfigProvider,
    mergedBorderedRef: computed(() => {
      const { bordered } = props;
      if (bordered !== undefined) return bordered;
      return NConfigProvider?.mergedBorderedRef.value ?? options.defaultBordered ?? true;
    }),
    mergedClsPrefixRef: computed(
      () => NConfigProvider?.mergedClsPrefixRef.value || defaultClsPrefix
    ),
    namespaceRef: computed(() => NConfigProvider?.mergedNamespaceRef.value),
  };
}
