import type { CSSProperties, VNode } from 'vue';
import type { DescriptionsProps } from 'ant-design-vue/es/descriptions';
import type { CollapseContainerOptions } from '/@/components/Container';

export interface DescItem {
  labelMinWidth?: number;

  contentMinWidth?: number;
  labelStyle?: CSSProperties;

  field: string;
  label: string | VNode | JSX.Element;
  span?: number;
  show?: (...args: any) => boolean;
  render?: (
    val: any,
    data: Recordable
  ) => VNode | undefined | JSX.Element | Element | string | number;
}

export interface DescOptions extends DescriptionsProps {
  useCollapse?: boolean;

  //  item configuration
  schema: DescItem[];

  data: Recordable;
  //  build-in collapseContainer component configuration
  collapseOptions?: CollapseContainerOptions;
}

export interface DescInstance {
  setDescProps(descProps: Partial<DescOptions>): void;
}

export type Register = (descInstance: DescInstance) => void;

export type UseDescReturnType = [Register, DescInstance];
