import {
  computed,
  CSSProperties,
  defineComponent,
  DirectiveArguments,
  inject,
  mergeProps,
  onBeforeUnmount,
  PropType,
  provide,
  ref,
  renderSlot,
  Transition,
  unref,
  VNode,
  vShow,
  watch,
  withDirectives,
} from 'vue';
import { FollowerInst, FollowerPlacement, VFollower } from 'vueuc';
import useTheme, { ThemeProps } from '/@/_mixins/use-theme';
import useAdjustedTo from '/@/_utils/composable/use-adjusted-to';
import useConfig from '/@/_mixins/use-config';
import convertToUnit from '/@/_utils/css/convert-to-unit';
import { PopoverInjection, popoverInjectionKey } from '/@/popover/src/Popover';
import { clickoutside, mousemoveoutside } from 'vdirs';
import {
  PopoverBodyInjection,
  popoverBodyInjectionKey,
  PopoverTrigger,
} from '/@/popover/src/interface';
import style from './styles/index.cssr';
import { popoverLight, PopoverTheme } from '/@/popover/styles';

interface RenderArrowProps {
  arrowStyle: string | CSSProperties | undefined;
  clsPrefix: string;
}

export const renderArrow = ({ arrowStyle, clsPrefix }: RenderArrowProps): VNode | null => {
  return (
    <div key="__popover-arrow__" class={`${clsPrefix}-popover-arrow-wrapper`}>
      <div class={`${clsPrefix}-popover-arrow`} style={arrowStyle} />
    </div>
  );
};

export const popoverBodyProps = {
  ...(useTheme.props as ThemeProps<PopoverTheme>),
  to: useAdjustedTo.propTo,
  show: Boolean,
  trigger: String as PropType<PopoverTrigger>,
  showArrow: Boolean,
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
    const { namespaceRef, mergedClsPrefixRef } = useConfig(props);
    const themeRef = useTheme('Popover', 'Popover', style, popoverLight, props, mergedClsPrefixRef);

    const popoverInjection = inject<PopoverInjection>(popoverInjectionKey)!;
    const followRef = ref<FollowerInst | null>(null);
    const bodyRef: PopoverBodyInjection = ref(null);
    const followerEnabledRef = ref(props.show);
    const directivesRef = computed<DirectiveArguments>(() => {
      const { trigger, onClickOutside } = props;
      const directives: DirectiveArguments = [];
      if (!unref(popoverInjection.positionManuallyRef)) {
        if (trigger === 'click' && !onClickOutside)
          directives.push([clickoutside, handleClickOutside]);
        if (trigger === 'hover') directives.push([mousemoveoutside, handleMouseMoveOutside]);
      }
      if (onClickOutside) directives.push([clickoutside, handleClickOutside]);
      if (props.displayDirective === 'show') directives.push([vShow, props.show]);
      return directives;
    });
    const styleRef = computed<CSSProperties>(() => {
      const {
        common: { cubicBezierEaseInOut, cubicBezierEaseIn, cubicBezierEaseOut },
        self: {
          space,
          spaceArrow,
          padding,
          fontSize,
          textColor,
          dividerColor,
          color,
          boxShadow,
          borderRadius,
          arrowHeight,
          arrowOffset,
          arrowOffsetVertical,
        },
      } = unref(themeRef);
      return {
        width: props.width === 'trigger' ? '' : convertToUnit(props.width),
        maxWidth: convertToUnit(props.maxWidth),
        minWidth: convertToUnit(props.minWidth),
        //  css vars
        '--bezier': cubicBezierEaseInOut,
        '--bezier-ease-in': cubicBezierEaseIn,
        '--bezier-ease-out': cubicBezierEaseOut,
        '--box-shadow': boxShadow,
        '--font-size': fontSize,
        '--text-color': textColor,
        '--color': color,
        '--divider-color': dividerColor,
        '--border-radius': borderRadius,
        '--arrow-height': arrowHeight,
        '--arrow-offset': arrowOffset,
        '--arrow-offset-vertical': arrowOffsetVertical,
        '--padding': padding,
        '--space': space,
        '--space-arrow': spaceArrow,
      } as CSSProperties;
    });

    popoverInjection.setBodyInstance({ syncPosition });
    onBeforeUnmount(() => {
      popoverInjection.setBodyInstance(null);
    });
    watch(
      () => props.show,
      (value) => {
        if (props.animated) return;
        followerEnabledRef.value = value;
      }
    );

    function syncPosition() {
      followRef.value?.syncPosition();
    }
    function handleMouseEnter(e: MouseEvent): void {
      if (props.trigger !== 'hover') return;
      popoverInjection.handleMouseEnter(e);
    }
    function handleMouseLeave(e: MouseEvent): void {
      if (props.trigger !== 'hover') return;
      popoverInjection.handleMouseLeave(e);
    }
    function handleMouseMoveOutside(e: MouseEvent): void {
      if (
        props.trigger !== 'hover' ||
        popoverInjection.getTriggerElement().contains(e.target as Node)
      )
        return;
      popoverInjection.handleMouseMoveOutside(e);
    }
    function handleClickOutside(e: MouseEvent): void {
      if (
        (props.trigger !== 'click' ||
          popoverInjection.getTriggerElement().contains(e.target as Node)) &&
        !props.onClickOutside
      )
        return;
      popoverInjection.handleClickOutside(e);
    }
    provide(popoverBodyInjectionKey, bodyRef);
    // provide(drawerBodyInjectionKey, null)
    // provide(modalBodyInjectionKey, null)

    return {
      popoverInjection,
      namespace: namespaceRef,
      followRef,
      adjustedTo: useAdjustedTo(props),
      style: styleRef,
      directives: directivesRef,
      mergedClsPrefix: mergedClsPrefixRef,
      followerEnabled: followerEnabledRef,
      bodyRef,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseMoveOutside,
    };
  },
  render() {
    const renderContentNode = (): VNode | null => {
      const renderBody = unref(this.popoverInjection.internalRenderBodyRef);
      const extraClass = unref(this.popoverInjection.extraClassRef);
      const contentNode: VNode = renderBody ? (
        renderBody(
          [
            `${this.mergedClsPrefix}-popover`,
            this.overlap && `${this.mergedClsPrefix}-popover--overlap`,
          ],
          this.bodyRef as HTMLElement | null,
          this.style,
          this.handleMouseEnter,
          this.handleMouseLeave
        )
      ) : (
        <div
          {...mergeProps(
            {
              class: [
                `${this.mergedClsPrefix}-popover`,
                extraClass.map((v) => `${this.mergedClsPrefix}-${v}`),
                {
                  [`${this.mergedClsPrefix}-popover--overlap`]: this.overlap,
                  [`${this.mergedClsPrefix}-popover-show-arrow`]: this.showArrow,
                  [`${this.mergedClsPrefix}-popover--show-header`]: !!this.$slots.header,
                  [`${this.mergedClsPrefix}-popover--raw`]: this.raw,
                },
              ],
              ref: 'bodyRef',
              style: this.style,
              onMouseenter: this.handleMouseLeave,
              onMouseleave: this.handleMouseLeave,
            },
            this.$attrs
          )}
        >
          {this.$slots.header ? (
            <>
              <div class={`${this.mergedClsPrefix}-popover__header`}>{this.$slots.header()}</div>
              <div class={`${this.mergedClsPrefix}-popover__content`}>{this.$slots}</div>
            </>
          ) : (
            renderSlot(this.$slots, 'default')
          )}
          {this.showArrow
            ? renderArrow({
                arrowStyle: this.arrowStyle,
                clsPrefix: this.mergedClsPrefix,
              })
            : null}
        </div>
      );
      return this.displayDirective === 'show' || this.show
        ? withDirectives(contentNode, this.directives)
        : null;
    };
    return (
      <VFollower
        show={this.show}
        enabled={this.followerEnabled}
        to={this.adjustedTo}
        x={this.x}
        y={this.y}
        placement={this.placement}
        containerClass={this.namespace}
        ref="followerRef"
        overlap={this.overlap}
        width={this.width === 'trigger' ? 'target' : undefined}
        teleportDisabled={this.adjustedTo === useAdjustedTo.tdKey}
      >
        {{
          default: () =>
            this.animated ? (
              <Transition
                name={'popover-transition'}
                appear={unref(this.popoverInjection.isMountedRef)}
                onEnter={() => (this.followerEnabled = true)}
                onAfterLeave={() => (this.followerEnabled = false)}
              >
                {{ default: renderContentNode }}
              </Transition>
            ) : (
              renderContentNode()
            ),
        }}
      </VFollower>
    );
  },
});
