import type { Ref, VNodeChild } from 'vue';
import type { CNode } from 'css-render';
import type { InputTheme } from '/@/input/styles/light';
import type { InputSize } from '/@/input/src/interface';
import type { ButtonSize } from '/@/button/src/interface';
import type { GlobalTheme, GlobalThemeOverrides } from './interface';
import type { Hljs } from '/@/_mixins/use-hljs';
import type { KDateLocale } from '/@/locales/date';

export interface GlobalThemeWithoutCommon {
  Input?: InputTheme;
}

export interface GlobalComponentConfig {
  Pagination?: {
    inputSize?: InputSize;
    selectSize?: SelectSize;
  };
  DatePicker?: {
    timePickerSize?: TimePickerSize;
  };
  Dialog?: {
    iconPlacement?: IconPlacement;
  };
  DataTable?: {
    renderFilter?: DataTableRenderFilter;
    renderSorter?: DataTableRenderSorter;
  };
  DynamicInput?: {
    buttonSize?: ButtonSize;
  };
}

export interface GlobalIconConfig {
  attach?: () => VNodeChild;
  cancel?: () => VNodeChild;
  clear?: () => VNodeChild;
  close?: () => VNodeChild;
  date?: () => VNodeChild;
  download?: () => VNodeChild;
  error?: () => VNodeChild;
  info?: () => VNodeChild;
  retry?: () => VNodeChild;
  success?: () => VNodeChild;
  time?: () => VNodeChild;
  to?: () => VNodeChild;
  trash?: () => VNodeChild;
  warning?: () => VNodeChild;
  rotateClockwise?: () => VNodeChild;
  rotateCounterclockwise?: () => VNodeChild;
  zoomIn?: () => VNodeChild;
  zoomOut?: () => VNodeChild;
}

export interface RtlItem {
  name: keyof GlobalThemeWithoutCommon;
  style: CNode;
}
export type RtlProp = RtlItem[];

export type RtlEnabledState = Partial<Record<keyof GlobalThemeWithoutCommon, RtlItem>>;

export type Breakpoints = { [k: string]: number } | undefined;

export interface KConfigProviderInjection {
  mergedBreakpointsRef: Ref<Breakpoints | undefined>;
  mergedClsPrefixRef: Ref<string | undefined>;
  mergedBorderedRef: Ref<boolean | undefined>;
  mergedNamespaceRef: Ref<string | undefined>;
  mergedLocaleRef: Ref<KLocale | undefined>;
  mergedDateLocaleRef: Ref<KDateLocale | undefined>;
  mergedHljsRef: Ref<Hljs | undefined>;
  mergedComponentPropsRef: Ref<GlobalComponentConfig | undefined>;
  mergedIconsRef: Ref<GlobalIconConfig | undefined>;
  mergedThemeRef: Ref<GlobalTheme | undefined>;
  mergedThemeOverridesRef: Ref<GlobalThemeOverrides | undefined>;
  mergedRtlRef: Ref<RtlEnabledState | undefined>;
  mergedThemeHashRef: Ref<string>;
  // non-reactive
  inlineThemeDisabled: boolean;
}
