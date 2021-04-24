import { CSSProperties, VNode } from 'vue';

export interface DescItem {
  labelMinWidth?: number;

  contentMinWidth?: number;
  labelStyle?: CSSProperties;

  label: string | VNode | JSX.Element;
  span?: number;
  show?: (...args: any) => boolean;
  render?: (
    val: any,
    data: Recordable
  ) => VNode | undefined | JSX.Element | Element | string | number;
}
