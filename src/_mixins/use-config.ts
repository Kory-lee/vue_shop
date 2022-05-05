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
  const ConfigProvider = inject(configProviderInjectionKey, null);
  return {
    inlineThemeDisabled: ConfigProvider?.inlineThemeDisabled,
    mergedRtlRef: ConfigProvider?.mergedRtlRef,
    mergedComponentPropsRef: ConfigProvider?.mergedComponentPropsRef,
    mergedBreakpointsRef: ConfigProvider?.mergedBreakpointsRef,
    mergedBorderedRef: computed(() => {
      const { bordered } = props;
      if (bordered !== undefined) return bordered;
      return ConfigProvider?.mergedBorderedRef.value ?? options.defaultBordered ?? true;
    }),
    mergedClsPrefixRef: computed(() => {
      const clsPrefix = ConfigProvider?.mergedClsPrefixRef.value;
      return clsPrefix || defaultClsPrefix;
    }),
    namespaceRef: computed(() => ConfigProvider?.mergedNamespaceRef.value),
  };
}
