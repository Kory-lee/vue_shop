import type { InternalRenderBody } from './interface';

import { defineComponent, PropType, Fragment, toRef } from 'vue';
import useTheme from '/@/_mixins/use-theme';
import { VBinder } from 'vueuc';
import { ExtractPublicPropTypes } from '/@/_utils/ui/extract-public-props';

export const popoverBaseProps = {
  show: Boolean,
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
            return <Fragment></Fragment>;
          },
        }}
      </VBinder>
    );
  },
});
