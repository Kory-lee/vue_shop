import type { PropType, Ref } from 'vue';
import type { ThemeCommonVars } from '/@/ui/_styles/common';
import type { CNode } from 'css-render';

import { inject, onBeforeMount } from 'vue';
import { useSsrAdapter } from '@css-render/vue3-ssr';
import globalStyle from '../_styles/global/index.cssr';
import { computed } from 'vue-demi';
import { merge } from 'lodash-es';
import { configProviderInjectionKey } from '/@/ui/config-provider/src/ConfigProvider';

export interface Theme<N, T = {}, R = any> {
  name: N;
  common?: ThemeCommonVars;
  peers?: R;
  self?: (vars: ThemeCommonVars) => T;
}

export interface ThemeProps<T> {
  theme: PropType<T>;
  themeOverrides: PropType<ExtractThemeOverrides<T>>;
  builtinThemeOverrides: PropType<ExtractThemeOverrides<T>>;
}

export type ExtractThemeOverrides<T> = Partial<ExtractThemeVars<T>> &
  ExtractPeerOverrides<T> & { common?: ThemeCommonVars };
export type ExtractThemeVars<T> = T extends Theme<unknown, infer U, unknown>
  ? unknown extends U // self is undefined, ThemeVars is unknown
    ? {}
    : U
  : {};
export type ExtractPeerOverrides<T> = T extends Theme<unknown, unknown, infer V>
  ? {
      peers?: {
        [k in keyof V]?: ExtractThemeOverrides<V[k]>;
      };
    }
  : T;

export function useTheme<N, T, R>(
  resolveId,
  mountId,
  style: CNode | undefined,
  defaultTheme: Theme<N, T, R>,
  props,
  clsPrefixRef?: Ref<string | undefined>
) {
  const ssrAdapter = useSsrAdapter();
  if (style) {
    const mountStyle = (): void => {
      const clsPrefix = clsPrefixRef?.value;
      style.mount({
        id: clsPrefix === undefined ? mountId : clsPrefix + mountId,
        head: true,
        props: {
          bPrefix: clsPrefix ? `.${clsPrefix}-` : undefined,
        },
        ssr: ssrAdapter,
      });
      globalStyle.mount({
        id: 'naive-ui/global',
        head: true,
        ssr: ssrAdapter,
      });
    };
    if (ssrAdapter) {
      mountStyle();
    } else {
      onBeforeMount(mountStyle);
    }
  }
  const NConfigProvider = inject(configProviderInjectionKey, null);

  return computed(() => {
    const {
      theme: { common: selfCommon, self, peers = {} } = {},
      themeOverrides: selfOverrides = {} as ExtractThemeOverrides<Theme<N, T, R>>,
      builtinThemeOverrides: builtinOverrides = {} as ExtractThemeOverrides<Theme<N, T, R>>,
    } = props;
    const { common: selfCommonOverrides, peers: peersOverrides } = selfOverrides;
    const {
      common: globalCommon = undefined,
      [resolveId]: {
        common: globalSelfCommon = undefined,
        self: globalSelf = undefined,
        peers: globalPeers = {},
      } = {},
    } = NConfigProvider?.mergedThemeRef.value || {};
    const { common: globalCommonOverrides = undefined, [resolveId]: globalSelfOverrides = {} } =
      NConfigProvider?.mergedThemeOverridesRef.value || {};

    const { common: globalSelfCommonOverrides, peers: globalPeersOverrides = {} } =
      globalSelfOverrides;

    const mergedCommon = merge(
      {},
      selfCommon || globalSelfCommon || globalCommon || defaultTheme.common,
      globalCommonOverrides,
      globalSelfCommonOverrides,
      selfCommonOverrides
    );
    const mergedSelf = merge(
      (self || globalSelf || defaultTheme.self)?.mergedCommon as T,
      builtinOverrides,
      globalSelfOverrides,
      selfOverrides
    );

    return {
      common: mergedCommon,
      self: mergedSelf,
      peers: merge({}, defaultTheme.peers, globalPeers, peers),
      peerOverrides: merge({}, globalPeersOverrides, peersOverrides),
    };
  });
}

useTheme.props = {
  theme: Object,
  themeOverrides: Object,
  builtinThemeOverrides: Object,
} as const;

export default useTheme;
