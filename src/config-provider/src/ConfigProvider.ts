import type { InjectionKey, PropType, ComputedRef } from 'vue';
import type { GlobalTheme, GlobalThemeOverrides } from './interface';
import type { KDateLocale } from '/@/locales/date';
import type { Hljs } from '/@/_mixins/use-hljs';
import type {
  KConfigProviderInjection,
  GlobalComponentConfig,
  GlobalIconConfig,
  RtlEnabledState,
  RtlProp,
  Breakpoints,
} from './internal-interface';

import { defineComponent, h, inject, renderSlot, computed, provide, markRaw } from 'vue';
import { merge } from 'lodash-es';
import { useMemo } from 'vooks';
import { defaultClsPrefix } from '/@/_mixins/use-config';
import { hash } from 'css-render';

export const configProviderInjectionKey: InjectionKey<KConfigProviderInjection> =
  Symbol('configProviderInjection');

export const configProviderProps = {
  abstract: Boolean,
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  clsPrefix: String,
  locale: Object as PropType<KDateLocale | null>,
  dateLocale: Object as PropType<KDateLocale | null>,
  namespace: String,
  rtl: Array as PropType<RtlProp>,
  tag: { type: String, default: 'div' },
  hljs: Object as PropType<Hljs>,
  theme: Object as PropType<GlobalTheme | null>,
  themeOverrides: Object as PropType<GlobalThemeOverrides | null>,
  componentOptions: Object as PropType<GlobalComponentConfig>,
  icons: Object as PropType<GlobalIconConfig>,
  breakpoints: Object as PropType<Breakpoints>,
  inlineThemeDisabled: {
    type: Boolean,
    default: undefined,
  },
};

export default defineComponent({
  name: 'ConfigProvider',
  alias: ['App'],
  props: configProviderProps,
  setup(props) {
    const ConfigProvider = inject(configProviderInjectionKey, null);
    const mergedThemeRef = computed(() => {
      const { theme } = props;
      if (theme === null) return undefined;
      const inheritedTheme = ConfigProvider?.mergedThemeRef.value;
      return theme === undefined
        ? inheritedTheme
        : inheritedTheme === undefined
        ? theme
        : { ...inheritedTheme, ...theme };
    });
    const mergedThemeOverridesRef = computed(() => {
      const { themeOverrides } = props;
      if (themeOverrides === null) return undefined;
      if (themeOverrides === undefined) return ConfigProvider?.mergedThemeOverridesRef.value;
      else {
        const inheritedThemeOverrides = ConfigProvider?.mergedThemeOverridesRef.value;
        if (inheritedThemeOverrides === undefined) return themeOverrides;
        return merge({}, inheritedThemeOverrides, themeOverrides);
      }
    });
    const mergedNamespaceRef = useMemo(() => {
        const { namespace } = props;
        return namespace === undefined ? ConfigProvider?.mergedNamespaceRef.value : namespace;
      }),
      mergedBorderedRef = useMemo(() => {
        const { bordered } = props;
        return bordered === undefined ? ConfigProvider?.mergedBorderedRef.value : bordered;
      }),
      mergedIconsRef = computed(() => {
        const { icons } = props;
        return icons === undefined ? ConfigProvider?.mergedIconsRef.value : icons;
      }),
      mergedComponentPropsRef = computed(() => {
        const { componentOptions } = props;
        if (componentOptions !== undefined) return componentOptions;
        return ConfigProvider?.mergedComponentPropsRef.value;
      }),
      mergedClsPrefixRef = computed(() => {
        const { clsPrefix } = props;
        return ConfigProvider?.mergedClsPrefixRef.value ?? clsPrefix;
      });
    const mergedRtlRef: ComputedRef<RtlEnabledState | undefined> = computed(() => {
      const { rtl } = props;
      if (rtl === undefined) {
        return ConfigProvider?.mergedRtlRef.value;
      }
      const rtlEnabledState: RtlEnabledState = {};
      for (const rtlInfo of rtl) {
        rtlEnabledState[rtlInfo.name] = markRaw(rtlInfo);
      }
      return rtlEnabledState;
    });

    const mergedBreakpointsRef = computed(() => {
      return props.breakpoints || ConfigProvider?.mergedBreakpointsRef.value;
    });
    const inlineThemeDisabled =
      props.inlineThemeDisabled || ConfigProvider?.inlineThemeDisabled || false;

    const mergedThemeHashRef = computed(() => {
      const { value: theme } = mergedThemeRef;
      const { value: mergedThemeOverrides } = mergedThemeOverridesRef;
      const hasThemeOverrides =
        mergedThemeOverrides && Object.keys(mergedThemeOverrides).length !== 0;
      const themeName = theme?.name;
      if (themeName) {
        if (hasThemeOverrides) {
          return `${themeName}-${hash(JSON.stringify(mergedThemeOverridesRef.value))}`;
        }
        return themeName;
      } else {
        if (hasThemeOverrides) {
          return hash(JSON.stringify(mergedThemeOverridesRef.value));
        }
        return '';
      }
    });

    provide(configProviderInjectionKey, {
      mergedThemeHashRef,
      mergedBreakpointsRef,
      mergedRtlRef,
      mergedIconsRef,
      mergedComponentPropsRef,
      mergedBorderedRef,
      mergedNamespaceRef,
      mergedClsPrefixRef,
      mergedLocaleRef: computed(() => {
        const { locale } = props;
        if (locale === null) return undefined;
        return locale === undefined ? ConfigProvider?.mergedLocaleRef.value : locale;
      }),
      mergedDateLocaleRef: computed(() => {
        const { dateLocale } = props;
        if (dateLocale === null) return undefined;
        return dateLocale === undefined ? ConfigProvider?.mergedDateLocaleRef.value : dateLocale;
      }),
      mergedHljsRef: computed(() => {
        const { hljs } = props;
        return hljs === undefined ? ConfigProvider?.mergedHljsRef.value : hljs;
      }),
      mergedThemeRef,
      mergedThemeOverridesRef,
      inlineThemeDisabled,
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
          this.tag,
          {
            class: `${this.mergedClsPrefix || defaultClsPrefix}-config-provider`,
          },
          renderSlot(this.$slots, 'default')
        )
      : renderSlot(this.$slots, 'default');
  },
});
