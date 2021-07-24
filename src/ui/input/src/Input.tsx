import type { CSSProperties, InputHTMLAttributes, PropType, TextareaHTMLAttributes } from 'vue';
import type { InputSize, OnUpdateValue } from '/@/ui/input/src/interface';
import type { MaybeArray } from '/@/ui/_utils/vue/call';

import { ref, computed, defineComponent, renderSlot, toRef } from 'vue';
import { ThemeProps, useTheme } from '/@/ui/_mixins/use-theme';
import style from './styles/input.cssr';
import inputLight, { InputTheme } from '/@/ui/input/styles/light';
import { getCurrentInstance } from 'vue-demi';
import { call } from '/@/ui/_utils/vue/call';
import { useMergedState } from 'vooks';
import useConfig from '../../_mixins/use-config';

const inputProps = {
  ...(useTheme.props as ThemeProps<InputTheme>),
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  type: {
    type: String as PropType<'input' | 'textarea' | 'password'>,
    default: 'input',
  },
  placeholder: [Array, String] as PropType<string | [string, string]>,
  defaultValue: {
    type: [String, Array] as PropType<null | string | [string, string]>,
    default: null,
  },
  value: [String, Array] as PropType<null | string | [string, string]>,
  disabled: Boolean,
  size: String as PropType<InputSize>,
  rows: {
    type: [Number, String] as PropType<number | string>,
    default: 3,
  },
  round: Boolean,
  minlength: [String, Number] as PropType<number | string>,
  maxlength: [String, Number] as PropType<number | string>,
  clearable: Boolean,
  autosize: {
    type: [Boolean, Object] as PropType<boolean | { minRows?: number; maxRows?: number }>,
    default: false,
  },
  pair: Boolean,
  separator: String,
  readonly: { type: [String, Boolean], default: false },
  passivelyActivated: Boolean,
  showPasswordToggle: Boolean,
  stateful: {
    type: Boolean,
    default: true,
  },
  autofocus: Boolean,
  inputProps: Object as PropType<TextareaHTMLAttributes | InputHTMLAttributes>,
  resizable: {
    type: Boolean,
    default: true,
  },
  showCount: Boolean,
  loading: {
    type: Boolean,
    default: undefined,
  },
  onInput: [Function, Array] as PropType<OnUpdateValue>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onChange: [Function, Array] as PropType<OnUpdateValue>,
  internalDeactivateOnEnter: Boolean,
  internalForceFocus: Boolean,
};

export default defineComponent({
  name: 'Input',
  props: inputProps,
  setup(props) {
    const { mergedClsPrefixRef, mergedBorderedRef } = useConfig(props);

    //dom ref
    const themeRef = useTheme('Input', 'Input', style, inputLight, props);
    const wrapperElRef = ref<HTMLElement | null>(null),
      textareaElRef = ref<HTMLTextAreaElement | null>(null),
      textareaMirrorElRef = ref<HTMLElement | null>(null),
      inputMirrorElRef = ref<HTMLElement | null>(null),
      inputElRef = ref<HTMLInputElement | null>(null),
      inputEl2Ref = ref<HTMLInputElement | null>(null);
    //value
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, 'value');
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);

    //state
    const focusedRef = ref(false);
    const hoverRef = ref(false);
    const isComposingRef = ref(false);
    const activatedRef = ref(false);
    let syncSource: string | null = null;

    // placeholder
    const mergedPlaceholderRef = computed<[string, string] | [string]>(() => {
      const { placeholder, pair } = props;
      if (pair) {
        if (Array.isArray(placeholder)) return placeholder;
        else if (placeholder === undefined) return ['', ''];
        return [placeholder, placeholder];
      } else if (placeholder === undefined) return [''];
      else if (Array.isArray(placeholder)) return placeholder;
      return [placeholder];
    });
    const showPlaceholder1Ref = computed(() => {
      const isComposing = isComposingRef.value;
      const mergedValue = mergedValueRef.value;
      const mergedPlaceholder = mergedPlaceholderRef.value;
      return (
        !isComposing &&
        (!mergedValue || (Array.isArray(mergedValue) && !mergedValue[0])) &&
        mergedPlaceholder
      );
    });
    const showPlaceholder2Ref = computed(() => {
      const isComposing = isComposingRef.value;
      const mergedValue = mergedValueRef.value;
      const mergedPlaceholder = mergedPlaceholderRef.value;
      return (
        !isComposing &&
        (!mergedValue || (Array.isArray(mergedValue) && !mergedValue[1])) &&
        mergedPlaceholder
      );
    });

    const showClearButtonRef = computed(() => {
      if (props.disabled || !props.clearable || (!mergedFocusRef.value && !hoverRef.value))
        return false;
      const mergedValue = mergedValueRef;
      const mergedFocus = mergedFocusRef;
      if (props.pair) return !!Array.isArray(mergedValue) && (mergedValue[0] || mergedValue[1]);
      return !!mergedValue && (hoverRef.value || mergedFocus);
    });

    const passwordVisibleRef = ref(false);

    const cssVars = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {
          countTextColor,
          color,
          fontSize,
          borderRadius,
          textColor,

          caretColor,
          caretColorError,
          caretColorWarning,
          textDecorationColor,
          border,
          borderDisabled,
          borderHover,
          borderFocus,
          placeholderColor,
          placeholderColorDisabled,
          lineHeightTextarea,
          colorDisabled,
          colorFocus,
          textColorDisabled,
          boxShadowFocus,
          iconSize,
          colorFocusWarning,
          boxShadowFocusWarning,
          borderWarning,
          borderFocusWarning,
          borderHoverWarning,
          colorFocusError,
          boxShadowFocusError,
          borderError,
          borderFocusError,
          borderHoverError,
          clearSize,
          clearColor,
          clearColorHover,
          clearColorPressed,
          iconColor,
          iconColorDisabled,
          suffixTextColor,
          iconColorHover,
          iconColorPressed,
          loadingColor,
          loadingColorError,
          loadingColorWarning,
        },
      } = themeRef.value;
      return {
        '--bezier': cubicBezierEaseInOut,
        '--count-text-color': countTextColor,
        '--color': color,
        '--font-size': fontSize,
        '--border-radius': borderRadius,
        '--text-color': textColor,
        '--caret-color': caretColor,
        '--text-decoration-color': textDecorationColor,
        '--border': border,
        '--border-disabled': borderDisabled,
        '--border-hover': borderHover,
        '--border-focus': borderFocus,
        '--placeholder-color': placeholderColor,
        '--placeholder-color-disabled': placeholderColorDisabled,
        '--icon-size': iconSize,
        '--line-height-textarea': lineHeightTextarea,
        '--color-disabled': colorDisabled,
        '--color-focus': colorFocus,
        '--text-color-disabled': textColorDisabled,
        '--box-shadow-focus': boxShadowFocus,
        '--loading-color': loadingColor,
        // form warning
        '--caret-color-warning': caretColorWarning,
        '--color-focus-warning': colorFocusWarning,
        '--box-shadow-focus-warning': boxShadowFocusWarning,
        '--border-warning': borderWarning,
        '--border-focus-warning': borderFocusWarning,
        '--border-hover-warning': borderHoverWarning,
        '--loading-color-warning': loadingColorWarning,
        // form error
        '--caret-color-error': caretColorError,
        '--color-focus-error': colorFocusError,
        '--box-shadow-focus-error': boxShadowFocusError,
        '--border-error': borderError,
        '--border-focus-error': borderFocusError,
        '--border-hover-error': borderHoverError,
        '--loading-color-error': loadingColorError,
        // clear-button
        '--clear-color': clearColor,
        '--clear-size': clearSize,
        '--clear-color-hover': clearColorHover,
        '--clear-color-pressed': clearColorPressed,
        '--icon-color': iconColor,
        '--icon-color-hover': iconColorHover,
        '--icon-color-pressed': iconColorPressed,
        '--icon-color-disabled': iconColorDisabled,
        '--suffix-text-color': suffixTextColor,
        // '--height': height,
        // '--padding-left': paddingLeft,
        // '--padding-right': paddingRight,
        // [createKey('padding', size)]: padding,
        // [createKey('fontSize', size)]: fontSize,
        // [createKey('height', size)]: height
      } as CSSProperties;
    });
    const mergedFocusRef = computed(() => props.internalForceFocus || focusedRef.value);

    const vm = getCurrentInstance()!.proxy!;
    console.log(vm);

    function doUpdateValue(value: string | [string, string]): void {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue, onInput } = props;
      if (onUpdateValue) call(onUpdateValue, value);
      if (_onUpdateValue) call(_onUpdateValue, value);
      if (onInput) call(onInput, value);
      uncontrolledValueRef.value = value;
    }

    function doChange(value: string | [string, string]): void {
      const { onChange } = props;
      if (onChange) call(onChange, value);
      uncontrolledValueRef.value = value;
    }

    function handleInput(
      e: InputEvent | CompositionEvent | Event,
      index: 0 | 1 = 0,
      event = 'input'
    ): void {
      const targetValue = (e.target as HTMLInputElement).value;
      syncMirror(targetValue);
      syncSource = targetValue;
      if (isComposingRef.value) return;
      if (!props.pair) event === 'input' ? doUpdateValue(targetValue) : doChange(targetValue);
      else {
        let { value } = mergedValueRef;
        if (!Array.isArray(value)) value = ['', ''];
        else value = [...value];
        value[index] = targetValue;
        event === 'input' ? doUpdateValue(value) : doChange(value);
      }

      vm.$forceUpdate();
    }

    function handleChange(e: Event, index?: 0 | 1): void {
      handleInput(e, index, 'change');
    }

    function syncMirror(value: string | null) {
      const { type, pair, autosize } = props;
      if (!pair && autosize) {
        if (type === 'textarea') {
          const textareaMirrorEl = textareaMirrorElRef.value;
          if (textareaMirrorEl) textareaMirrorEl.textContent = (value ?? '') + `\r\n`;
        } else {
          const inputMirrorEl = inputMirrorElRef.value;
          if (inputMirrorEl) {
            if (value) inputMirrorEl.textContent = value;
            else inputMirrorEl.innerHTML = '&nbsp';
          }
        }
      }
    }

    return {
      // dom ref
      wrapperElRef,
      inputElRef,
      inputMirrorElRef,
      inputEl2Ref,
      textareaElRef,
      textareaMirrorElRef,

      //value
      passwordVisible: passwordVisibleRef,
      isComposing: isComposingRef,
      activated: activatedRef,
      showClearButton: showClearButtonRef,
      mergedValue: mergedValueRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedFocus: mergedFocusRef,
      mergedBordered: mergedBorderedRef,
      mergedPlaceholder: mergedPlaceholderRef,
      showPlaceholder1: showPlaceholder1Ref,
      showPlaceholder2: showPlaceholder2Ref,
      handleInput,
      handleChange,
      mergedTheme: themeRef,
      cssVars,
    };
  },
  render() {
    const { mergedClsPrefix } = this;
    return (
      <div
        ref="wrapperElRef"
        class={[
          `${mergedClsPrefix}-input`,
          {
            [`${mergedClsPrefix}-input--disabled`]: this.disabled,
            [`${mergedClsPrefix}-input--textarea`]: this.type === 'textarea',
            [`${mergedClsPrefix}-input--resizable`]: this.resizable && !this.autosize,
            [`${mergedClsPrefix}-input--autosize`]: this.autosize,
            [`${mergedClsPrefix}-input--round`]: this.round && !(this.type === 'textarea'),
            [`${mergedClsPrefix}-input--pair`]: this.pair,
            [`${mergedClsPrefix}-input--focus`]: this.mergedFocus,
            [`${mergedClsPrefix}-input--stateful`]: this.stateful,
          },
        ]}
        style={this.cssVars}
      >
        {/* textarea & basic input*/}
        <div class={`${mergedClsPrefix}-input-wrapper`}>
          {this.$slots.affix || this.$slots.prefix ? (
            <div class={`${mergedClsPrefix}-input__prefix`}>
              {renderSlot(this.$slots, 'affix', undefined, () => [
                renderSlot(this.$slots, 'prefix'),
              ])}
            </div>
          ) : null}
          {this.type === 'textarea' ? (
            <div class={`${mergedClsPrefix}-input__textarea`}>
              <textarea
                ref="textareaElRef"
                class={`${mergedClsPrefix}-input__textarea-el`}
                disabled={this.disabled}
                onInput={this.handleInput}
                onChange={this.handleChange}
              />
              {this.showPlaceholder1 ? (
                <div class={`${mergedClsPrefix}-input__placeholder`}>
                  {this.mergedPlaceholder[0]}
                </div>
              ) : null}
            </div>
          ) : (
            <div class={`${mergedClsPrefix}-input__input`}>
              <input
                ref="inputElRef"
                type={
                  this.type === 'password' && this.showPasswordToggle && this.passwordVisible
                    ? 'text'
                    : this.type
                }
                class={`${mergedClsPrefix}-input__input-el`}
                tabindex={this.passivelyActivated && !this.activated ? -1 : undefined}
                placeholder={this.mergedPlaceholder[0]}
                disabled={this.disabled}
                maxlength={this.maxlength}
                minlength={this.minlength}
                value={
                  Array.isArray(this.mergedValue) ? this.mergedValue[0] : (this.mergedValue as any)
                }
                readonly={this.readonly as any}
                autofocus={this.autofocus}
                onInput={(e) => this.handleInput(e, 0)}
                onChange={(e) => this.handleChange(e, 0)}
              />
              {this.showPlaceholder1 ? (
                <div class={`${mergedClsPrefix}-input__placeholder`}>
                  <span>{this.mergedPlaceholder[0]}</span>
                </div>
              ) : null}
              {this.autosize ? (
                <div
                  class={`${mergedClsPrefix}-input__input-mirror`}
                  key="mirror"
                  ref="inputMirrorElRef"
                >
                  &nbsp;
                </div>
              ) : null}
            </div>
          )}
          {!this.pair &&
          (this.$slots.suffix ||
            this.clearable ||
            this.showCount ||
            this.showPasswordToggle ||
            this.loading !== undefined) ? (
            <div class={`${mergedClsPrefix}-input__suffix`}>{[]}</div>
          ) : null}
        </div>
        {/*pair input*/}
        {this.pair ? (
          <div class={`${mergedClsPrefix}-input-separator`}>
            {renderSlot(this.$slots, 'separator', undefined, () => [this.separator])}
          </div>
        ) : null}
        {this.pair ? (
          <div class={`${mergedClsPrefix}-input-wrapper`}>
            <div class={`${mergedClsPrefix}-input__input`}>
              <input
                ref="inputEl2Ref"
                type={this.type}
                class={`${mergedClsPrefix}-input__input-el`}
                tabindex={this.passivelyActivated && !this.activated ? -1 : undefined}
                placeholder={this.mergedPlaceholder[1]}
                disabled={this.disabled}
                maxlength={this.maxlength}
                minlength={this.minlength}
                value={Array.isArray(this.mergedValue) ? this.mergedValue[1] : undefined}
                readonly={this.readonly as any}
                style={{}}
                onInput={(e) => this.handleInput(e, 1)}
                onChange={(e) => this.handleChange(e, 1)}
              />
              {this.showPlaceholder2 ? (
                <div class={`${mergedClsPrefix}-input__placeholder`}>
                  <span>{this.mergedPlaceholder[1]}</span>
                </div>
              ) : null}
            </div>
            <div class={`${mergedClsPrefix}-input__suffix`}>
              {[
                this.clearable || this.$slots.clear ? <div>clear</div> : null,
                renderSlot(this.$slots, 'suffix'),
              ]}
            </div>
          </div>
        ) : null}
        {/*border*/}
      </div>
    );
  },
});
