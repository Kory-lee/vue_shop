import { CSSProperties, defineComponent, PropType, ref, VNode } from 'vue';
import { FollowerInst, FollowerPlacement, VFollower } from 'vueuc';
import useTheme from '/@/_mixins/use-theme';
import useAdjustedTo from '/@/_utils/composable/use-adjusted-to';
import useConfig from '/@/_mixins/use-config';

interface RenderArrowProps {
  arrowStyle: string | CSSProperties | undefined;
  clsPrefix: string;
}
export const renderArrow = ({ arrowStyle, clsPrefix }: RenderArrowProps): VNode | null => (
  <div key="__popover-arrow__" class={`${clsPrefix}-popover-arrow-wrapper`}>
    <div class={`${clsPrefix}-popover-arrow`} style={arrowStyle} />
  </div>
);

export const popoverBodyProps = {
  ...useTheme.props,
  to: useAdjustedTo.propTo,
  show: Boolean,
  delay: Number,
  duration: Number,
  raw: Boolean,
  arrowStyle: [String, Object] as PropType<string | CSSProperties>,
  displayDirective: String as PropType<'if' | 'show'>,
  x: Number,
  y: Number,
  flip: Boolean,
  overlap: Boolean,
  placement: String as PropType<FollowerPlacement>,
  width: [Number, String] as PropType<number | 'trigger'>,
  // private
  animated: Boolean,
  onClickOutside: Function as PropType<(e: MouseEvent) => void>,
  minWidth: Number,
  maxWidth: Number,
};

export default defineComponent({
  name: 'PopoverBody',
  inheritAttrs: false,
  props: popoverBodyProps,
  setup(props) {
    const { namespaceRef } = useConfig(props);
    const followRef = ref<FollowerInst | null>(null);

    return {
      namespace: namespaceRef,
      followRef,
      adjustedTo: useAdjustedTo(props),
    };
  },
  render() {
    return <VFollower show={this.show}></VFollower>;
  },
});
