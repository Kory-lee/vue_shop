import type { ButtonTheme } from '/@/button/styles';
import type { ButtonSize, ButtonType } from '/@/button/src/interface';
import type { ExtractPublicPropTypes } from '/@/_utils/ui/extract-public-props';

import {
  computed,
  CSSProperties,
  defineComponent,
  nextTick,
  PropType,
  ref,
  renderSlot,
  unref,
} from 'vue';
import useTheme, { ThemeProps } from '/@/_mixins/use-theme';
import { call, MaybeArray } from '/@/_utils/vue/call';
import useConfig from '/@/_mixins/use-config';
import { useMemo } from 'vooks';
import useRtl from '/@/_mixins/use-rtl';
import style from './styles/button.cssr';
import { buttonLight } from '/@/button/styles';
import { createKey } from '/@/_utils/cssr';
import { createHoverColor, createPressedColor } from '/@/_utils/color';
import useFormItem from '/@/_mixins/use-form-item';
import { BaseWaveRef, BaseWave } from '/@/_internal/wave';

export type ButtonProps = ExtractPublicPropTypes<typeof buttonProps>;

const buttonProps = {
  ...(useTheme.props as ThemeProps<ButtonTheme>),
  color: String,
  text: Boolean,
  block: Boolean,
  loading: Boolean,
  disabled: Boolean,
  circle: Boolean,
  ghost: Boolean,
  round: Boolean,
  size: String as PropType<ButtonSize>,
  depth: [Number, String] as PropType<1 | 2 | 3 | '1' | '2' | '3'>,
  focusable: { type: Boolean, default: true },
  keyboard: { type: Boolean, default: true },
  tag: { type: String as PropType<keyof HTMLElementTagNameMap>, default: 'button' },
  type: { type: String as PropType<ButtonType>, default: 'default' },
  dashed: Boolean,
  iconPlacement: { type: String as PropType<'left' | 'right'>, default: 'left' },
  attrType: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
  onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  bordered: { type: Boolean, default: true },
};

export default defineComponent({
  name: 'Button',
  props: buttonProps,
  setup(props) {
    const selfRef = ref<HTMLElement | null>(null);
    const waveRef = ref<BaseWaveRef | null>(null);
    const enterPressedRef = ref(false);
    const showBorderRef = useMemo(
      () => !props.text && (!props.color || props.ghost || props.dashed) && props.bordered
    );

    const { mergedClsPrefixRef } = useConfig(props);
    const { KConfigProvider } = useConfig(props);
    const themeRef = useTheme('Button', 'Button', style, buttonLight, props, mergedClsPrefixRef);
    const { mergedSizeRef } = useFormItem(
      {},
      {
        defaultSize: 'medium',
        mergedSize: (KFormItem) => {
          const { size } = props;
          if (size) return size;
          const { mergedSize: formItemSize } = KFormItem || {};
          if (formItemSize) return formItemSize.value;
          return 'medium';
        },
      }
    );
    const mergedFocusableRef = computed(() => props.focusable && !props.disabled);

    function handleMouseDown(e: MouseEvent) {
      e.preventDefault();
      if (props.disabled) return;
      if (mergedFocusableRef.value) selfRef.value?.focus({ preventScroll: true });
    }

    function handleClick(e) {
      if (props.disabled) return;
      const { onClick } = props;
      if (onClick) call(onClick, e);
      if (props.text) return;
      unref(waveRef)?.play();
    }

    function handleKeyUp(e: KeyboardEvent): void {
      switch (e.code) {
        case 'Enter':
        case 'NumpadEnter':
          if (!props.keyboard) return e.preventDefault();
          enterPressedRef.value = false;
          void nextTick(() => {
            if (props.disabled) return;
            selfRef.value?.click();
          });
      }
    }

    function handleKeyDown(e: KeyboardEvent): void {
      switch (e.code) {
        case 'Enter':
        case 'NumpadEnter':
          if (!props.keyboard) return;
          e.preventDefault();
          enterPressedRef.value = true;
      }
    }
    function handleBlur(): void {
      enterPressedRef.value = false;
    }

    const rtlEnabledRef = useRtl('Button', KConfigProvider?.mergedRtlRef, mergedClsPrefixRef);
    return {
      selfRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedFocusable: mergedFocusableRef,
      mergedSize: mergedSizeRef,
      showBorder: showBorderRef,
      rtlEnabled: rtlEnabledRef,
      enterPressed: enterPressedRef,
      handleClick,
      handleMouseDown,
      handleBlur,
      handleKeyUp,
      handleKeyDown,
      customColorCssVar: computed(() => {
        const { color } = props;
        if (!color) return null;
        const hoverColor = createHoverColor(color);
        return {
          '--border-color': color,
          '--border-color-hover': hoverColor,
          '--border-color-pressed': createPressedColor(color),
          '--border-color-focus': hoverColor,
          '--border-color-disabled': color,
        };
      }),
      cssVars: computed(() => {
        const {
          common: { cubicBezierEaseInOut, cubicBezierEaseOut },
          self,
        } = unref(themeRef);
        const { rippleDuration, opacityDisabled, fontWeightText, fontWeighGhost, fontWeight } =
          self;
        const size = mergedSizeRef.value;
        const { dashed, type, ghost, text, color, round, circle, depth } = props;
        //font
        const fontProps = {
          '--font-weight': text ? fontWeightText : ghost ? fontWeighGhost : fontWeight,
        };
        // color
        const colorProps = text
          ? {
              '--color': '#0000',
              '--color-hover': '#0000',
              '--color-pressed': '#0000',
              '--color-focus': '#0000',
              '--color-disabled': '#0000',
              '--ripple-color': '#0000',
              '--text-color':
                color || (type === 'default' && depth !== undefined)
                  ? self[createKey('textColorTextDepth', String(depth))]
                  : self[createKey('textColorText', type)],
              '--text-color-hover': color
                ? createHoverColor(color)
                : self[createKey('textColorTextHover', type)],
              '--text-color-pressed': color
                ? createPressedColor(color)
                : self[createKey('textColorTextPressed', type)],
              '--text-color-focus': color
                ? createHoverColor(color)
                : self[createKey('textColorTextHover', type)],
              '--text-color-disabled': color || self[createKey('textColorTextDisabled', type)],
            }
          : ghost || dashed
          ? {
              '--color': '#0000',
              '--color-hover': '#0000',
              '--color-pressed': '#0000',
              '--color-focus': '#0000',
              '--color-disabled': '#0000',
              '--ripple-color': color || self[createKey('rippleColor', type)],
              '--text-color': color || self[createKey('textColorGhost', type)],
              '--text-color-hover': color
                ? createHoverColor(color)
                : self[createKey('textColorGhostHover', type)],
              '--text-color-pressed': color
                ? createPressedColor(color)
                : self[createKey('textColorGhostPressed', type)],
              '--text-color-focus': color
                ? createHoverColor(color)
                : self[createKey('textColorGhostFocus', type)],
              '--text-color-disabled': color || self[createKey('textColorGhostDisabled', type)],
            }
          : {
              '--color': color || self[createKey('color', type)],
              '--color-hover': color
                ? createHoverColor(color)
                : self[createKey('colorHover', type)],
              '--color-pressed': color
                ? createPressedColor(color)
                : self[createKey('colorPressed', type)],
              '--color-focus': color
                ? createHoverColor(color)
                : self[createKey('colorFocus', type)],
              '--color-disabled': color || self[createKey('colorDisabled', type)],
              '--ripple-color': color || self[createKey('rippleColor', type)],
              '--text-color': color ? self.textColorPrimary : self[createKey('textColor', type)],
              '--text-color-hover': color
                ? self.textColorHoverPrimary
                : self[createKey('textColorHover', type)],
              '--text-color-pressed': color
                ? self.textColorPressedPrimary
                : self[createKey('textColorPressed', type)],
              '--text-color-focus': color
                ? self.textColorFocusPrimary
                : self[createKey('textColorFocus', type)],
              '--text-color-disabled': color
                ? self.textColorDisabledPrimary
                : self[createKey('textColorDisabled', type)],
            };

        const borderProps = text
          ? {
              '--border': 'none',
              '--border-hover': 'none',
              '--border-pressed': 'none',
              '--border-focus': 'none',
              '--border-disabled': 'none',
            }
          : {
              '--border': self[createKey('border', type)],
              '--border-hover': self[createKey('borderHover', type)],
              '--border-pressed': self[createKey('borderPressed', type)],
              '--border-focus': self[createKey('borderFocus', type)],
              '--border-disabled': self[createKey('borderDisabled', type)],
            };

        const {
          [createKey('height', size)]: height,
          [createKey('fontSize', size)]: fontSize,
          [createKey('padding', size)]: padding,
          [createKey('paddingRound', size)]: paddingRound,
          [createKey('iconSize', size)]: iconSize,
          [createKey('borderRadius', size)]: borderRadius,
          [createKey('iconMargin', size)]: iconMargin,
          waveOpacity,
        } = self;

        const sizeProps = {
          '--width': circle && !text ? height : 'initial',
          '--height': text ? 'initial' : height,
          '--font-size': fontSize,
          '--padding': circle ? 'initial' : text ? 'initial' : round ? paddingRound : padding,
          '--icon-size': iconSize,
          '--icon-margin': iconMargin,
          '--border-radius': text ? 'initial' : circle || round ? height : borderRadius,
        };
        return {
          '--bezier': cubicBezierEaseInOut,
          '--bezier-ease-out': cubicBezierEaseOut,
          '--ripple-duration': rippleDuration,
          '--opacity-disabled': opacityDisabled,
          '--wave-opacity': waveOpacity,
          ...fontProps,
          ...colorProps,
          ...borderProps,
          ...sizeProps,
        };
      }),
    };
  },
  render({ $slots, mergedClsPrefix, tag: Component }) {
    return (
      <Component
        class={[
          `${mergedClsPrefix}-button`,
          `${mergedClsPrefix}-button--${this.type}-type`,
          {
            [`${mergedClsPrefix}-button--rtl`]: this.rtlEnabled,
            [`${mergedClsPrefix}-button--disabled`]: this.disabled,
            [`${mergedClsPrefix}-button--block`]: this.block,
            [`${mergedClsPrefix}-button--pressed`]: this.enterPressed,
            [`${mergedClsPrefix}-button--dashed`]: !this.text && this.dashed,
            [`${mergedClsPrefix}-button--color`]: this.color,
            [`${mergedClsPrefix}-button--ghost`]: this.ghost, // required for button group border collapse
          },
        ]}
        tabindex={this.mergedFocusable ? 0 : -1}
        type={this.attrType}
        style={this.cssVars}
        disabled={this.disabled}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        onKeyup={this.handleKeyUp}
        onKeydown={this.handleKeyDown}
        onMousedown={this.handleMouseDown}
      >
        {$slots.default && this.iconPlacement === 'right' ? (
          <div class={`${mergedClsPrefix}-button__content`}>{renderSlot($slots, 'default')}</div>
        ) : null}
        {}
        {$slots.default && this.iconPlacement === 'left' ? (
          <span class={`${mergedClsPrefix}-button__content`}>{renderSlot($slots, 'default')}</span>
        ) : null}
        {!this.text ? <BaseWave ref="waveRef" clsPrefix={mergedClsPrefix} /> : null}
        {this.showBorder ? (
          <div
            aria-hidden
            class={`${mergedClsPrefix}-button__border`}
            style={this.customColorCssVar as CSSProperties}
          />
        ) : null}
        {this.showBorder ? (
          <div
            aria-hidden
            class={`${mergedClsPrefix}-button__state-border`}
            style={this.customColorCssVar as CSSProperties}
          />
        ) : null}
      </Component>
    );
  },
});
