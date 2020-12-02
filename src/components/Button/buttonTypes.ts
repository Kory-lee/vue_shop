import type { PropType } from 'vue';
import { isValidComponentSize } from '../_utils/validator';
export enum ButtonSizes {
  large = 'lg',
  small = 'sm',
  default = '',
}
type ButtonType = PropType<
  | 'primary'
  | 'default'
  | 'dashed'
  | 'link'
  | 'ghost'
  | 'warning'
  | 'text'
  | 'info'
  | 'danger'
  | 'success'
>;
export default {
  prefixCls: String,
  type: {
    type: String as ButtonType,
    default: 'default',
    validator(val: string) {
      return [
        'primary',
        'default',
        'dashed',
        'link',
        'ghost',
        'warning',
        'text',
        'info',
        'danger',
        'success',
      ].includes(val);
    },
  },
  htmlType: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
    validator(val: string) {
      return ['button', 'submit', 'reset'].includes(val);
    },
  },
  color: String as PropType<'error' | 'waring' | 'success'>,
  size: {
    type: String as PropType<'small' | 'large' | 'default'>,
    default: 'default',
    validator: isValidComponentSize,
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
  autofocus: Boolean,
  // throttle: {},
};
