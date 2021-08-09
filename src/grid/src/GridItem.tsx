import type { ExtractPublicPropTypes } from '/@/_utils/ui/extract-public-props';

import { defineComponent, inject, PropType, renderSlot, CSSProperties, computed } from 'vue';
import { gridInjectionKey } from '/@/grid/src/Grid';
import { pxfy } from 'seemly';

export const defaultSpan = 1;

interface GridItemVNodeProps {
  privateOffset?: number;
  privateSpan?: number;
  privateColStart?: number;
  privateShow: boolean;
}

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
    const { xGapRef, itemStyleRef, overflowRef } = inject(gridInjectionKey)!;
    // const self = getCurrentInstance();

    return {
      overflow: overflowRef,
      itemStyle: itemStyleRef,
      deriveStyle: computed(() => {
        // Here is quite a hack, I hope there is a better way to solve it
        const {
          privateSpan = defaultSpan,
          privateShow = true,
          privateColStart = undefined,
          privateOffset = 0,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        } = props as GridItemVNodeProps;
        const { value: xGap } = xGapRef;
        const mergedXGap = pxfy(xGap || 0);
        return {
          display: !privateShow ? 'none' : '',
          gridColumn: `${privateColStart ?? `span ${privateSpan}`} / span ${privateSpan}`,
          marginLeft: privateOffset
            ? `calc((100% - (${privateSpan} - 1) * ${mergedXGap}) / ${privateSpan} * ${privateOffset} + ${mergedXGap} * ${privateOffset})`
            : '',
        };
      }),
    };
  },
  render() {
    return (
      <div style={[this.itemStyle, this.deriveStyle] as unknown as CSSProperties}>
        {renderSlot(this.$slots, 'default', { overflow: this.overflow })}
      </div>
    );
  },
});
