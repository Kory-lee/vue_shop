import { defineComponent, inject, PropType, renderSlot } from 'vue';
import { ExtractPublicPropTypes } from '/@/_utils/ui/extract-public-props';
import { gridInjectionKey } from '/@/grid/src/Grid';

export const defaultSpan = 1;

export const gridItemProps = {
  span: { type: [Number, String] as PropType<string | number>, default: defaultSpan },
  offset: { type: [Number, String] as PropType<string | number>, default: 0 },
  suffix: Boolean,

  privateOffset: Number,
  privateSpan: Number,
  privateColStart: Number,
  privateShow: { type: Boolean, default: true },
};

export type GridItemProps = ExtractPublicPropTypes<keyof typeof gridItemProps>;

export default defineComponent({
  __GRID_ITEM__: true,
  name: 'GridItem',
  alias: ['Gi'],
  props: gridItemProps,
  setup(props) {
    const { xGapRef, itemStyleRef, overflowRef } = inject(gridInjectionKey, {});

    return {
      overflow: overflowRef,
      itemStyle: itemStyleRef,
    };
  },
  render() {
    return <div style>{renderSlot(this.$slots, 'default', { overflow: this.overflow })}</div>;
  },
});
