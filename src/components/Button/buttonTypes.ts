import type { PropType } from 'vue';
export enum ButtonSizes {
  large = 'lg',
  small = 'sm',
  default = '',
}

export default {
  prefixCls: String,
  type: {
    type: String as PropType<'primary' | 'default' | 'dashed' | 'link' | 'ghost'>,
    default: 'default',
  },
  htmlType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  color: String as PropType<'error' | 'waring' | 'success'>,
  size: {
    type: String as PropType<'small' | 'large' | 'default'>,
    default: 'default',
  },
  loading: {
    type: [Object, Boolean],
    default: false,
  },
  disabled: { type: Boolean, default: false },
  block: Boolean,
  shape: String as PropType<'circle' | 'circle-outline' | 'round'>,
  ghost: { type: Boolean, default: false },
  icon: String,
  onClick: Function,
  // throttle: {},
};
