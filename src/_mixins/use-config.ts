import { computed, ComputedRef, inject } from 'vue';
import { configProviderInjectionKey } from '../config-provider/src/ConfigProvider';
import { KConfigProviderInjection } from '../config-provider/src/internal-interface';

type UseConfigProps = Readonly<{
  bordered?: boolean;
  [key: string]: unknown;
}>;

export const defaultClsPrefix = `k`;

export default function useConfig(
  props: UseConfigProps,
  options: { defaultBordered?: boolean } = { defaultBordered: true }
): {
  KConfigProvider: KConfigProviderInjection | null;
  mergedBorderedRef: ComputedRef<boolean>;
  mergedClsPrefixRef: ComputedRef<string>;
  namespaceRef: ComputedRef<string | undefined>;
} {
  const KConfigProvider = inject(configProviderInjectionKey, null);
  return {
    KConfigProvider,
    mergedBorderedRef: computed(() => {
      const { bordered } = props;
      if (bordered !== undefined) return bordered;
      return KConfigProvider?.mergedBorderedRef.value ?? options.defaultBordered ?? true;
    }),
    mergedClsPrefixRef: computed(
      () => KConfigProvider?.mergedClsPrefixRef.value || defaultClsPrefix
    ),
    namespaceRef: computed(() => KConfigProvider?.mergedNamespaceRef.value),
  };
}
