import type { ComputedRef, PropType, Ref } from 'vue';
import type { ThemeCommonVars } from '/@/_styles/common';
import type { CNode } from 'css-render';

import { inject, onBeforeMount, computed } from 'vue';
import { useSsrAdapter } from '@css-render/vue3-ssr';
import globalStyle from '../_styles/global/index.cssr';
import { merge } from 'lodash-es';
import { configProviderInjectionKey } from '/@/config-provider/src/ConfigProvider';

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

export type ExtractMergedPeerOverrides<T> = T extends Theme<unknown, unknown, infer V>
  ? {
      [k in keyof V]?: ExtractPeerOverrides<V[k]>;
    }
  : T;

export function createTheme<N extends string, T, R>(theme: Theme<N, T, R>): Theme<N, T, R> {
  return theme;
}

type UseThemeProps<T> = Readonly<{
  theme?: T | undefined;
  themeOverrides?: ExtractThemeOverrides<T>;
  builtinThemeOverrides?: ExtractThemeOverrides<T>;
}>;
export type ExtractPeerOverrides<T> = T extends Theme<unknown, unknown, infer V>
  ? {
      peers?: {
        [k in keyof V]?: ExtractThemeOverrides<V[k]>;
      };
    }
  : T;

export type MergedTheme<T> = T extends Theme<unknown, infer V, infer W>
  ? {
      common: ThemeCommonVars;
      self: V;
      peers: W;
      peerOverrides: ExtractMergedPeerOverrides<T>;
    }
  : T;

export function useTheme<N, T, R>(
  resolveId,
  mountId: string,
  style: CNode | undefined,
  defaultTheme: Theme<N, T, R>,
  props: UseThemeProps<Theme<N, T, R>>,
  clsPrefixRef?: Ref<string | undefined>
): ComputedRef<MergedTheme<Theme<N, T, R>>> {
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
  const ConfigProvider = inject(configProviderInjectionKey, null);

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
    } = ConfigProvider?.mergedThemeRef.value || {};
    const { common: globalCommonOverrides = undefined, [resolveId]: globalSelfOverrides = {} } =
      ConfigProvider?.mergedThemeOverridesRef.value || {};

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
      (self || globalSelf || defaultTheme.self)?.(mergedCommon) as T,
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
