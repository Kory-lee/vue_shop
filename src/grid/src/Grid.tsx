import {
  computed,
  CSSProperties,
  defineComponent,
  InjectionKey,
  mergeProps,
  PropType,
  provide,
  ref,
  Ref,
  toRef,
  VNode,
} from 'vue';
import useConfig from '/@/_mixins/use-config';
import { useBreakpoint, useMemo } from 'vooks';
import { beforeNextFrameOnce, parseResponsivePropValue, pxfy } from 'seemly';
import { VResizeObserver, VResizeObserverOnResize } from 'vueuc';
import getSlot from '/@/_utils/vue/getSlot';
import { flatten } from '/@/_utils/vue/flatten';
import { defaultSpan } from './GridItem';
import { ExtractPublicPropTypes } from '/@/_utils/ui/extract-public-props';

const defaultCols = 24;

const gridProps = {
  responsive: { type: [String, Boolean] as PropType<'self' | 'screen'>, default: 'self' },
  cols: { type: [Number, String] as PropType<number | string>, default: defaultCols },
  collapsed: Boolean,
  collapsedRows: { type: Number, default: 1 },
  itemStyle: [Object, String] as PropType<CSSProperties | string>,
  xGap: { type: [Number, String] as PropType<number | string>, default: 0 },
  yGap: { type: [Number, String] as PropType<number | string>, default: 0 },
};

export type GridProps = ExtractPublicPropTypes<typeof gridProps>;

export interface GridInjection {
  itemStyleRef: Ref<CSSProperties | string | undefined>;
  xGapRef: Ref<string | undefined>;
  overflowRef: Ref<boolean>;
}

export const gridInjectionKey: InjectionKey<GridInjection> = Symbol('grid');

export default defineComponent({
  name: 'Grid',
  inheritAttrs: false,
  props: gridProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    const numRegex = /^\d+$/;
    const widthRef = ref<number | undefined>(undefined);
    const breakpointRef = useBreakpoint();
    const isResponsiveRef = useMemo(() => {
      if (!numRegex.test(props.cols.toString())) return true;
      return !(
        numRegex.test(props.cols.toString()) &&
        numRegex.test(props.xGap.toString()) &&
        numRegex.test(props.yGap.toString())
      );
    });
    const responsiveQueryRef = computed(() => {
      if (!isResponsiveRef.value) return undefined;
      return props.responsive === 'self' ? widthRef.value : breakpointRef.value;
    });
    const responsiveColsRef = useMemo(
      () =>
        Number(parseResponsivePropValue(props.cols.toString(), responsiveQueryRef.value)) ??
        defaultCols
    );
    const responsiveXGapRef = useMemo(() =>
      parseResponsivePropValue(props.xGap.toString(), responsiveQueryRef.value)
    );
    const responsiveYGapRef = useMemo(() =>
      parseResponsivePropValue(props.yGap.toString(), responsiveQueryRef.value)
    );
    const handleResize: VResizeObserverOnResize = function (entry) {
      widthRef.value = entry.contentRect.width;
    };
    const handleResizeRaf: VResizeObserverOnResize = function (entry) {
      beforeNextFrameOnce(handleResize, entry);
    };
    const overflowRef = ref(false);
    const handleResizeRef = computed<VResizeObserverOnResize | undefined>(() =>
      props.responsive === 'self' ? handleResizeRaf : undefined
    );
    provide(gridInjectionKey, {
      itemStyleRef: toRef(props, 'itemStyle'),
      xGapRef: responsiveXGapRef,
      overflowRef,
    });

    return {
      mergedClsPrefix: mergedClsPrefixRef,
      style: computed<CSSProperties>(() => ({
        width: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(${responsiveColsRef.value}, minmax(0, 1fr))`,
        columnGap: pxfy(responsiveXGapRef.value),
        rowGap: pxfy(responsiveYGapRef.value),
      })),
      responsiveQuery: responsiveQueryRef,
      responsiveCols: responsiveColsRef,
      handleResize: handleResizeRef,
      overflow: overflowRef,
    };
  },
  render() {
    const renderContent = (): VNode => {
      this.overflow = false;
      const children = flatten(getSlot(this.$slots, 'default'));

      let suffixSpan = 0;
      const maybeSuffixNode = children[children.length - 1];
      if (maybeSuffixNode?.props) {
        const suffixPropValue = maybeSuffixNode.props?.suffix;
        if (suffixPropValue !== undefined && suffixPropValue !== false) {
          suffixSpan = maybeSuffixNode.props?.span ?? defaultSpan;
          maybeSuffixNode.props.privateColStart = this.responsiveCols + 1 - suffixSpan;
          maybeSuffixNode.props.privateShow = true;
        }
      }

      let spanCounter = 0;
      let done = false;
      for (const child of children) {
        if ((child?.type as any)?.__GRID_ITEM__ !== true) continue;
        if (done) this.overflow = true;
        if (!done) {
          const childOffset = Number(
            parseResponsivePropValue(
              child.props?.offset as string | number | undefined,
              this.responsiveQuery ?? 0
            )
          );
          const childSpan =
            Math.min(
              Number(
                parseResponsivePropValue(
                  child.props?.span as string | number | undefined,
                  this.responsiveQuery
                ) ?? defaultSpan
              ) + childOffset,
              this.responsiveCols
            ) || 1;

          if (!child.props) {
            child.props = {
              privateSpan: childSpan,
              privateOffset: childOffset,
            };
          } else {
            child.props.privateSpan = childSpan;
            child.props.privateOffset = childOffset;
          }
          if (this.collapsed) {
            const remainder = spanCounter % this.responsiveCols;
            if (childSpan + remainder > this.responsiveCols)
              spanCounter += this.responsiveCols - remainder;
            if (childSpan + spanCounter + suffixSpan > this.collapsedRows + this.responsiveCols)
              done = true;
            else spanCounter += childSpan;
          }
        }
        if (done) {
        }
      }

      return (
        <div
          {...(mergeProps(
            { class: `${this.mergedClsPrefix}-grid`, style: this.style },
            this.$attrs
          ) as any)}
        >
          {children}
        </div>
      );
    };
    return this.responsive === 'self' ? (
      <VResizeObserver onResize={this.handleResize}>{{ default: renderContent }}</VResizeObserver>
    ) : (
      renderContent()
    );
  },
});
