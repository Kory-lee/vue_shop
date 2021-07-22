import type { Ref } from 'vue';
import type { CNode } from 'css-render';
import type { InputTheme } from '/@/ui/input/styles/light';
import type { VNodeChild } from 'vue-demi';
import { InputSize } from '/@/ui/input/src/interface';

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

export interface ConfigProviderInjection {
  mergedClsPrefixRef: Ref<string | undefined>;
  mergedBorderedRef: Ref<boolean | undefined>;
  mergedNamespaceRef: Ref<string | undefined>;
  mergedLocaleRef: Ref<NLocale | undefined>;
  mergedDateLocaleRef: Ref<NDateLocale | undefined>;
  mergedHljsRef: Ref<Hljs | undefined>;
  mergedComponentPropsRef: Ref<GlobalComponentConfig | undefined>;
  mergedIconsRef: Ref<GlobalIconConfig | undefined>;
  mergedThemeRef: Ref<GlobalTheme | undefined>;
  mergedThemeOverridesRef: Ref<GlobalThemeOverrides | undefined>;
  mergedRtlRef: Ref<RtlEnabledState | undefined>;
}
