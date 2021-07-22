import type { InjectionKey, PropType, ComputedRef } from 'vue';
import {
  ConfigProviderInjection,
  GlobalComponentConfig,
  GlobalIconConfig,
  RtlEnabledState,
  RtlProp,
} from './internal-interface';

import { defineComponent, h, inject, renderSlot, computed, provide, warn, markRaw } from 'vue';
import { merge } from 'lodash-es';
import { useMemo } from 'vooks';

export const configProviderInjectionKey: InjectionKey<ConfigProviderInjection> =
  Symbol('configProviderInjection');

export const configProviderProps = {
  abstract: Boolean,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  clsPrefix: String,
  locale: Object as PropType<NDateLocale | null>,
  dateLocale: Object as PropType<NDateLocale | null>,
  namespace: String,
  rtl: Array as PropType<RtlProp>,
  tag: { type: String, default: 'div' },
  hljs: Object as PropType<Hljs>,
  theme: Object as PropType<GlobalTheme | null>,
  themeOverrides: Object as PropType<GlobalThemeOverrides | null>,
  componentOptions: Object as PropType<GlobalComponentConfig>,
  icons: Object as PropType<GlobalIconConfig>,
  as: {
    type: String as PropType<string | undefined>,
    validator: () => {
      warn('config-provider', '`as` is deprecated, please use `tag` instead');
      return true;
    },
  },
};

export default defineComponent({
  name: 'ConfigProvider',
  alias: ['App'],
  props: configProviderProps,
  setup(props) {
    const NConfigProvider = inject(configProviderInjectionKey, null);
    const mergedThemeRef = computed(() => {
      const { theme } = props;
      if (theme === null) return undefined;
      const inheritedTheme = NConfigProvider?.mergedThemeRef.value;
      return theme === undefined
        ? inheritedTheme
        : inheritedTheme === undefined
        ? theme
        : { ...inheritedTheme, ...theme };
    });
    const mergedThemeOverridesRef = computed(() => {
      const { themeOverrides } = props;
      if (themeOverrides === null) return undefined;
      if (themeOverrides === undefined) return NConfigProvider?.mergedThemeOverridesRef.value;
      else {
        const inheritedThemeOverrides = NConfigProvider?.mergedThemeOverridesRef.value;
        if (inheritedThemeOverrides === undefined) return themeOverrides;
        return merge({}, inheritedThemeOverrides, themeOverrides);
      }
    });
    const mergedNamespaceRef = useMemo(() => {
        const { namespace } = props;
        return namespace === undefined ? NConfigProvider?.mergedNamespaceRef.value : namespace;
      }),
      mergedBorderedRef = useMemo(() => {
        const { bordered } = props;
        return bordered === undefined ? NConfigProvider?.mergedBorderedRef.value : bordered;
      }),
      mergedIconsRef = computed(() => {
        const { icons } = props;
        return icons === undefined ? NConfigProvider?.mergedIconsRef.value : icons;
      }),
      mergedComponentPropsRef = computed(() => {
        const { componentOptions } = props;
        if (componentOptions !== undefined) return componentOptions;
        return NConfigProvider?.mergedComponentPropsRef.value;
      }),
      mergedClsPrefixRef = computed(() => {
        const { clsPrefix } = props;
        return NConfigProvider?.mergedClsPrefixRef.value ?? clsPrefix;
      });
    const mergedRtlRef: ComputedRef<RtlEnabledState | undefined> = computed(() => {
      const { rtl } = props;
      if (rtl === undefined) {
        return NConfigProvider?.mergedRtlRef.value;
      }
      const rtlEnabledState: RtlEnabledState = {};
      for (const rtlInfo of rtl) {
        rtlEnabledState[rtlInfo.name] = markRaw(rtlInfo);
      }
      return rtlEnabledState;
    });

    provide(configProviderInjectionKey, {
      mergedRtlRef,
      mergedIconsRef,
      mergedComponentPropsRef,
      mergedBorderedRef,
      mergedNamespaceRef,
      mergedClsPrefixRef,
      mergedLocaleRef: computed(() => {
        const { locale } = props;
        if (locale === null) return undefined;
        return locale === undefined ? NConfigProvider?.mergedLocaleRef.value : locale;
      }),
      mergedDateLocaleRef: computed(() => {
        const { dateLocale } = props;
        if (dateLocale === null) return undefined;
        return dateLocale === undefined ? NConfigProvider?.mergedDateLocaleRef.value : dateLocale;
      }),
      mergedHljsRef: computed(() => {
        const { hljs } = props;
        return hljs === undefined ? NConfigProvider?.mergedHljsRef.value : hljs;
      }),
      mergedThemeRef,
      mergedThemeOverridesRef,
    });

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      mergedNamespace: mergedNamespaceRef,
      mergedTheme: mergedThemeRef,
      mergedThemeOverrides: mergedThemeOverridesRef,
    };
  },
  render() {
    return !this.abstract
      ? h(
          this.as || this.tag,
          {
            class: `${this.mergedClsPrefix}-config-provider`,
          },
          renderSlot(this.$slots, 'default')
        )
      : renderSlot(this.$slots, 'default');
  },
});
