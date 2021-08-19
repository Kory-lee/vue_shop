import type { InternalRenderBody, PopoverTrigger } from './interface';
import type { ExtractPublicPropTypes } from '/@/_utils/ui/extract-public-props';

import { defineComponent, PropType } from 'vue';
import useTheme from '/@/_mixins/use-theme';
import { FollowerPlacement, VBinder } from 'vueuc';

export const popoverBaseProps = {
  show: Boolean as PropType<boolean | undefined>,
  defaultShow: Boolean,
  showArrow: { type: Boolean, default: true },
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'hover',
  },
  delay: { type: Number, default: 100 },
  duration: { type: Number, default: 100 },
  raw: Boolean,
  placement: { type: String as PropType<FollowerPlacement>, default: 'top' },
  x: Number,
  y: Number,
  disabled: Boolean,
};

const popoverProps = {
  ...useTheme.props,
  ...popoverBaseProps,
  internalRenderBody: Function as PropType<InternalRenderBody>,
};

export type PopoverProps = ExtractPublicPropTypes<typeof popoverBaseProps>;

export default defineComponent({
  name: 'Popover',
  inheritAttrs: false,
  props: popoverProps,
  setup() {
    // const controlledShowRef = toRef(props, 'show');
    return {};
  },
  render() {
    return (
      <VBinder>
        {{
          default: () => {
            return [];
          },
        }}
      </VBinder>
    );
  },
});
