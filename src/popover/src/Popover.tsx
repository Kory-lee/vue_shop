import type { InternalRenderBody, PopoverTrigger } from './interface';
import type { ExtractPublicPropTypes } from '/@/_utils/ui/extract-public-props';

import {
  defineComponent,
  PropType,
  warn,
  CSSProperties,
  computed,
  ref,
  unref,
  VNode,
  ComputedRef,
  Ref,
  provide,
  toRef,
  mergeProps,
} from 'vue';
import useTheme, { ThemeProps } from '/@/_mixins/use-theme';
import { FollowerPlacement, VBinder, VTarget } from 'vueuc';
import { call, MaybeArray } from '/@/_utils/vue/call';
import { useCompitable, useIsMounted, useMemo, useMergedState } from 'vooks';
import { getFirstSlotVNode } from '/@/_utils/vue/getFirstSlotVNode';
import PopoverBody, { popoverBodyProps } from '/@/popover/src/PopoverBody';
import { PopoverTheme } from '/@/popover/styles';
import { pick } from 'lodash-es';

interface BodyInstance {
  syncPosition: () => void;
  [key: string]: unknown;
}

export interface PopoverInjection {
  handleMouseLeave: (e: MouseEvent) => void;
  handleMouseEnter: (e: MouseEvent) => void;
  handleMouseMoveOutside: (e: MouseEvent) => void;
  handleClickOutside: (e: MouseEvent) => void;
  getTriggerElement: () => HTMLElement;
  setBodyInstance: (value: BodyInstance | null) => void;
  internalRenderBodyRef: Ref<InternalRenderBody | undefined>;
  positionManuallyRef: ComputedRef<boolean>;
  isMountedRef: Ref<boolean>;
  extraClassRef: Ref<string[]>;
}

export const popoverInjectionKey = Symbol('Popover');

export const popoverBaseProps = {
  show: { type: Boolean as PropType<boolean | undefined>, default: undefined },
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
  displayDirective: {
    type: String as PropType<'if' | 'show'>,
    default: 'if',
  },
  arrowStyle: [String, Object] as PropType<string | CSSProperties>,
  flip: {
    type: Boolean,
    default: true,
  },
  animated: {
    type: Boolean,
    default: true,
  },
  width: {
    type: [Number, String] as PropType<number | 'trigger'>,
    default: undefined,
  },
  overlap: Boolean,
  internalExtraClass: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  onClickOutside: Function as PropType<(e: MouseEvent) => void>,
  // events
  'onUpdate:show': [Function, Array] as PropType<MaybeArray<(value: boolean) => void>>,
  onUpdateShow: [Function, Array] as PropType<MaybeArray<(value: boolean) => void>>,
  /** @deprecated */
  onShow: {
    type: [Function, Array] as PropType<MaybeArray<(value: boolean) => void> | undefined>,
    validator: (): boolean => {
      warn('popover', '`on-show` is deprecated, please use `on-update:show` instead.');
      return true;
    },
    default: undefined,
  },
  /** @deprecated */
  onHide: {
    type: [Function, Array] as PropType<MaybeArray<(value: boolean) => void> | undefined>,
    validator: (): boolean => {
      warn('popover', '`on-hide` is deprecated, please use `on-update:show` instead.');
      return true;
    },
    default: undefined,
  },
  /** @deprecated */
  arrow: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  /** @deprecated */
  minWidth: Number,
  /** @deprecated */
  maxWidth: Number,
};

const popoverProps = {
  ...(useTheme.props as ThemeProps<PopoverTheme>),
  ...popoverBaseProps,
  internalRenderBody: Function as PropType<InternalRenderBody>,
};

export type PopoverProps = ExtractPublicPropTypes<typeof popoverBaseProps>;

const bodyPropKeys = Object.keys(popoverBodyProps) as Array<keyof typeof popoverBodyProps>;

const triggerEventMap = {
  focus: ['onFocus', 'onBlur'],
  click: ['onClick'],
  hover: ['onMouseenter', 'onMouseleave'],
  manual: [],
};

function appendEvents(
  vNode: VNode,
  trigger: PopoverTrigger,
  events: {
    onClick: (e: MouseEvent) => void;
    onMouseenter: (e: MouseEvent) => void;
    onMouseleave: (e: MouseEvent) => void;
    onFocus: (e: FocusEvent) => void;
    onBlur: (e: FocusEvent) => void;
  }
): void {
  triggerEventMap[trigger].forEach((eventName) => {
    if (!vNode.props) vNode.props = {};
    else vNode.props = Object.assign({}, vNode.props);
    const originalHandler = vNode.props[eventName];
    const handler = events[eventName];
    if (!originalHandler) vNode.props[eventName] = handler;
    else {
      vNode.props[eventName] = (...args: unknown[]) => {
        originalHandler(...args);
        handler(...args);
      };
    }
  });
}

export default defineComponent({
  name: 'Popover',
  inheritAttrs: false,
  props: popoverProps,
  setup(props) {
    const isMountedRef = useIsMounted();
    // setup show
    const controlledShowRef = computed(() => props.show);
    const uncontrolledShowRef = ref(props.defaultShow);
    const mergedShowWithoutDisabledRef = useMergedState(controlledShowRef, uncontrolledShowRef);

    const mergedShowConsideringDisabledPropRef = useMemo(() => {
      if (props.disabled) return false;
      return unref(mergedShowWithoutDisabledRef);
    });
    const mergedShowRef = computed(() => {
      if (props.disabled) return false;
      return unref(mergedShowWithoutDisabledRef);
    });
    // setup show arrow
    const compatibleShowArrowRef = useCompitable(props, ['arrow', 'showArrow']);
    const mergedShowArrowRef = computed(() => {
      if (props.overlap) return false;
      return unref(compatibleShowArrowRef);
    });
    // trigger
    let triggerVNode: VNode | null = null;
    // bodyInstance
    let bodyInstance: BodyInstance | null = null;
    const showTimerIdRef = ref<number | null>(null);
    const hideTimerIdRef = ref<number | null>(null);
    const positionManuallyRef = useMemo(() => props.x !== undefined && props.y !== undefined);

    //methods
    function doUpdateShow(value: boolean): void {
      const { 'onUpdate:show': _onUpdateShow, onUpdateShow, onShow, onHide } = props;
      uncontrolledShowRef.value = value;
      if (_onUpdateShow) call(_onUpdateShow, value);
      if (onUpdateShow) call(onUpdateShow, value);
      if (value && onShow) call(onShow, true);
      if (value && onHide) call(onHide, false);
    }
    function syncPosition(): void {
      if (!bodyInstance) return;
      bodyInstance.syncPosition();
    }
    function clearShowTimer(): void {
      const showTimerId = unref(showTimerIdRef);
      if (!showTimerId) return;
      window.clearTimeout(showTimerId);
      showTimerIdRef.value = null;
    }
    function clearHideTimer(): void {
      const hideTimerId = unref(hideTimerIdRef);
      if (!hideTimerId) return;
      window.clearTimeout(hideTimerId);
      hideTimerIdRef.value = null;
    }
    function handleFocus(): void {
      if (props.trigger !== 'focus' || props.disabled) return;
      if (unref(mergedShowRef)) return;
      doUpdateShow(true);
    }
    function handleBlur(): void {
      if (props.trigger !== 'focus' || props.disabled) return;
      if (!unref(mergedShowRef)) return;
      doUpdateShow(false);
    }
    function handleMouseEnter(): void {
      if (props.trigger !== 'hover' || props.disabled) return;
      clearHideTimer();
      if (showTimerIdRef.value !== null) return;
      if (mergedShowRef.value) return;
      const delayCallback = (): void => {
        doUpdateShow(true);
        showTimerIdRef.value = null;
      };
      if (props.delay === 0) delayCallback();
      else showTimerIdRef.value = window.setTimeout(delayCallback, props.delay);
    }
    function handleMouseLeave(): void {
      if (props.trigger !== 'hover' || props.disabled) return;
      clearShowTimer();
      if (hideTimerIdRef.value !== null || !unref(mergedShowRef)) return;
      const delayedCallback = (): void => {
        doUpdateShow(false);
        hideTimerIdRef.value = null;
      };
      if (props.duration === 0) delayedCallback();
      else hideTimerIdRef.value = window.setTimeout(delayedCallback, props.duration);
    }
    function handleMouseMoveOutside(): void {
      handleMouseLeave();
    }
    function handleClickOutside(e: MouseEvent): void {
      if (!unref(mergedShowRef)) return;
      if (props.trigger === 'click') {
        clearShowTimer();
        clearHideTimer();
        doUpdateShow(false);
      }
      props.onClickOutside?.(e);
    }
    function handleClick(): void {
      if (props.trigger !== 'click' || props.disabled) return;
      clearShowTimer();
      clearHideTimer();
      doUpdateShow(!unref(mergedShowRef));
    }
    function setShow(value: boolean): void {
      uncontrolledShowRef.value = value;
    }
    function getTriggerElement(): HTMLElement {
      return triggerVNode?.el as HTMLElement;
    }
    function setBodyInstance(value: BodyInstance | null): void {
      bodyInstance = value;
    }
    provide<PopoverInjection>(popoverInjectionKey, {
      getTriggerElement,
      handleMouseEnter,
      handleMouseLeave,
      handleClickOutside,
      handleMouseMoveOutside,
      setBodyInstance,
      positionManuallyRef: positionManuallyRef,
      isMountedRef,
      extraClassRef: toRef(props, 'internalExtraClass'),
      internalRenderBodyRef: toRef(props, 'internalRenderBody'),
    });

    return {
      positionManually: positionManuallyRef,
      mergedShowConsideringDisabledProp: mergedShowConsideringDisabledPropRef,
      uncontrolledShow: uncontrolledShowRef,
      mergedShowArrow: mergedShowArrowRef,
      mergedShow: mergedShowRef,
      setShow,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      handleFocus,
      handleBlur,
      setTriggerVNode(v: VNode | null) {
        triggerVNode = v;
      },
      syncPosition,
    };
  },
  render() {
    const renderTriggerVNode = () => {
      if (this.positionManually) return null;
      const triggerVNode = this.$slots.activator
        ? getFirstSlotVNode(this.$slots, 'activator')
        : getFirstSlotVNode(this.$slots, 'trigger');
      if (triggerVNode) {
        appendEvents(triggerVNode, this.positionManually ? 'manual' : this.trigger, {
          onClick: this.handleClick,
          onMouseenter: this.handleMouseEnter,
          onMouseleave: this.handleMouseLeave,
          onFocus: this.handleFocus,
          onBlur: this.handleBlur,
        });
      }
      this.setTriggerVNode(triggerVNode);
      return <VTarget>{{ default: () => triggerVNode }}</VTarget>;
    };

    return (
      <VBinder>
        {{
          default: () => {
            void this.mergedShowConsideringDisabledProp;
            return [
              renderTriggerVNode(),
              <PopoverBody
                {...mergeProps(pick(this.$props, bodyPropKeys), {
                  ...this.$attrs,
                  showArrow: this.mergedShowArrow,
                  show: this.mergedShow,
                })}
              >
                {this.$slots}
              </PopoverBody>,
            ];
          },
        }}
      </VBinder>
    );
  },
});
