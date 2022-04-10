import type {
  Breakpoints,
  GlobalComponentConfig,
  RtlEnabledState,
} from '../config-provider/src/internal-interface';

import { computed, ComputedRef, inject, Ref } from 'vue';
import { configProviderInjectionKey } from '../config-provider/src/ConfigProvider';

type UseConfigProps = Readonly<{
  bordered?: boolean;
  [key: string]: unknown;
}>;

export const defaultClsPrefix = `k`;

export default function useConfig(
  props: UseConfigProps = {},
  options: { defaultBordered?: boolean } = { defaultBordered: true }
): {
  inlineThemeDisabled: boolean | undefined;
  mergedRtlRef: Ref<RtlEnabledState | undefined> | undefined;
  mergedBorderedRef: ComputedRef<boolean>;
  mergedClsPrefixRef: ComputedRef<string>;
  mergedBreakpointsRef: Ref<Breakpoints> | undefined;
  mergedComponentPropsRef: Ref<GlobalComponentConfig | undefined> | undefined;
  namespaceRef: ComputedRef<string | undefined>;
} {
  const KConfigProvider = inject(configProviderInjectionKey, null);
  return {
    inlineThemeDisabled: KConfigProvider?.inlineThemeDisabled,
    mergedRtlRef: KConfigProvider?.mergedRtlRef,
    mergedComponentPropsRef: KConfigProvider?.mergedComponentPropsRef,
    mergedBreakpointsRef: KConfigProvider?.mergedBreakpointsRef,
    mergedBorderedRef: computed(() => {
      const { bordered } = props;
      if (bordered !== undefined) return bordered;
      return KConfigProvider?.mergedBorderedRef.value ?? options.defaultBordered ?? true;
    }),
    mergedClsPrefixRef: computed(() => {
      const clsPrefix = KConfigProvider?.mergedClsPrefixRef.value;
      return clsPrefix || defaultClsPrefix;
    }),
    namespaceRef: computed(() => KConfigProvider?.mergedNamespaceRef.value),
  };
}
