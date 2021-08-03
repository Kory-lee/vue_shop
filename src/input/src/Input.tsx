import type {
  CSSProperties,
  InputHTMLAttributes,
  PropType,
  TextareaHTMLAttributes,
  WatchStopHandle,
} from 'vue';
import type {
  InputSize,
  InputWrappedRef,
  OnUpdateValue,
  OnUpdateValueImpl,
} from '/@/input/src/interface';
import type { MaybeArray } from '/@/_utils/vue/call';

import {
  ref,
  computed,
  defineComponent,
  renderSlot,
  toRef,
  onMounted,
  getCurrentInstance,
  provide,
  watchEffect,
  watch,
  nextTick,
} from 'vue';
import { ThemeProps, useTheme } from '/@/_mixins/use-theme';
import style from './styles/input.cssr';
import inputLight, { InputTheme } from '/@/input/styles/light';
import { call } from '/@/_utils/vue/call';
import { useMergedState } from 'vooks';
import useConfig from '../../_mixins/use-config';
import useFormItem from '../../_mixins/use-form-item';
import { createKey } from '/@/_utils/cssr';
import { getPadding } from 'seemly';
import { inputInjectionKey } from '/@/input/src/interface';
import WordCount from './WordCount';
import { BaseIcon } from '/@/_internal/icon';
import Eye from '/@/_internal/icons/Eye';
import EyeOff from '/@/_internal/icons/EyeOff';
import { BaseClear } from '/@/_internal/clear';

const inputProps = {
  ...(useTheme.props as ThemeProps<InputTheme>),
  bordered: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  type: {
    type: String as PropType<'input' | 'textarea' | 'password'>,
    default: undefined,
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
  stateful: { type: Boolean, default: true },
  autofocus: Boolean,
  inputProps: Object as PropType<TextareaHTMLAttributes | InputHTMLAttributes>,
  resizable: {
    type: Boolean,
    default: true,
  },
  showCount: Boolean,
  loading: Boolean,
  onMousedown: Function as PropType<(e: MouseEvent) => void>,
  onKeydown: Function as PropType<(e: KeyboardEvent) => void>,
  onKeyup: Function as PropType<(e: KeyboardEvent) => void>,
  'onUpdate:value': [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onUpdateValue: [Function, Array] as PropType<MaybeArray<OnUpdateValue>>,
  onInput: [Function, Array] as PropType<OnUpdateValue>,
  onChange: [Function, Array] as PropType<OnUpdateValue>,
  onFocus: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onBlur: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onClick: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  onClear: [Function, Array] as PropType<MaybeArray<(e: MouseEvent) => void>>,
  // private
  textDecoration: [String, Array] as PropType<string | [string, string]>,
  attrSize: { type: Number, default: 20 },
  onInputBlur: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onInputFocus: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onDeactivate: [Function, Array] as PropType<MaybeArray<() => void>>,
  onActivate: [Function, Array] as PropType<MaybeArray<() => void>>,
  onWrapperFocus: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  onWrapperBlur: [Function, Array] as PropType<MaybeArray<(e: FocusEvent) => void>>,
  internalDeactivateOnEnter: Boolean,
  internalForceFocus: Boolean,
};

export default defineComponent({
  name: 'Input',
  props: inputProps,
  setup(props) {
    const { mergedClsPrefixRef, mergedBorderedRef } = useConfig(props);

    //dom ref
    const themeRef = useTheme('Input', 'Input', style, inputLight, props, mergedClsPrefixRef);
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
    // form-item
    const formItem = useFormItem(props);
    const { mergedSizeRef, mergedDisabledRef } = formItem;
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
      if (
        mergedDisabledRef.value ||
        props.readonly ||
        !props.clearable ||
        (!mergedFocusRef.value && !hoverRef.value)
      )
        return false;
      const mergedValue = mergedValueRef.value;
      const mergedFocus = mergedFocusRef.value;
      if (props.pair)
        return (
          !!(Array.isArray(mergedValue) && (mergedValue[0] || mergedValue[1])) &&
          (hoverRef.value || mergedFocus)
        );
      return !!mergedValue && (hoverRef.value || mergedFocus);
    });

    const passwordVisibleRef = ref(false);
    const mergedFocusRef = computed(() => props.internalForceFocus || focusedRef.value);

    //text-decoration
    const textDecorationStyleRef = computed(() => {
      const { textDecoration } = props;
      if (!textDecoration) return ['', ''];
      if (Array.isArray(textDecoration)) return textDecoration.map((v) => ({ textDecoration: v }));
      return [{ textDecoration }];
    });

    // word count
    const maxlengthRef = computed(() => {
      const maxLength = props;
      return maxLength === undefined ? undefined : Number(maxLength);
    });
    const updateTextAreaStyle = (): void => {
      if (props.type !== 'textarea') return;
      const { autosize } = props;
      if (typeof autosize === 'boolean') return;
      if (!textareaElRef.value) return;
      const {
        paddingTop: stylePaddingTop,
        paddingBottom: stylePaddingBottom,
        lineHeight: styleLineHeight,
      } = window.getComputedStyle(textareaElRef.value);
      const paddingTop = Number(stylePaddingTop.slice(0, -2));
      const paddingBottom = Number(stylePaddingBottom.slice(0, -2));
      const lineHeight = Number(styleLineHeight.slice(0, -2));
      const textareaMirrorEl = textareaMirrorElRef.value;
      if (!textareaMirrorEl) return;
      if (autosize.minRows) {
        const minRows = Math.max(autosize.minRows, 1);
        textareaMirrorEl.style.minHeight = `${paddingTop + paddingBottom + lineHeight * minRows}px`;
      }
      if (autosize.maxRows) {
        textareaMirrorEl.style.maxHeight = `${
          paddingTop + paddingBottom + lineHeight * autosize.maxRows
        }px`;
      }
    };

    const vm = getCurrentInstance()!.proxy!;

    function doUpdateValue(value: string | [string, string]): void {
      const { onUpdateValue, 'onUpdate:value': _onUpdateValue, onInput } = props;
      const { triggerFormInput } = formItem;
      if (onUpdateValue) call(onUpdateValue as OnUpdateValueImpl, value);
      if (_onUpdateValue) call(_onUpdateValue as OnUpdateValueImpl, value);
      if (onInput) call(onInput as OnUpdateValueImpl, value);
      uncontrolledValueRef.value = value;
      triggerFormInput();
    }

    function doChange(value: string | [string, string]): void {
      const { onChange } = props;
      const { triggerFormChange } = formItem;
      if (onChange) call(onChange as OnUpdateValueImpl, value);
      uncontrolledValueRef.value = value;
      triggerFormChange();
    }

    function doBlur(e: FocusEvent) {
      const { onBlur } = props;
      const { triggerFormBlur } = formItem;
      if (onBlur) call(onBlur, e);
      triggerFormBlur();
    }

    function doFocus(e: FocusEvent): void {
      const { onFocus } = props;
      const { triggerFormFocus } = formItem;
      if (onFocus) call(onFocus, e);
      triggerFormFocus();
    }

    function doClear(e: FocusEvent) {
      const { onClear } = props;
      if (onClear) call(onClear, e);
    }

    function doUpdateValueBlur(e: FocusEvent): void {
      const { onInputBlur } = props;
      if (onInputBlur) call(onInputBlur, e);
    }

    function doUpdateValueFocus(e: FocusEvent): void {
      const { onInputFocus } = props;
      if (onInputFocus) call(onInputFocus, e);
    }

    function doDeactivate(): void {
      const { onDeactivate } = props;
      if (onDeactivate) call(onDeactivate);
    }

    function doActivate(): void {
      const { onActivate } = props;
      if (onActivate) call(onActivate);
    }

    function doClick(e: MouseEvent) {
      const { onClick } = props;
      if (onClick) call(onClick, e);
    }

    function doWrapperFocus(e: FocusEvent): void {
      const { onWrapperFocus } = props;
      if (onWrapperFocus) call(onWrapperFocus, e);
    }

    function doWrapperBlur(e: FocusEvent): void {
      const { onWrapperBlur } = props;
      if (onWrapperBlur) call(onWrapperBlur, e);
    }

    // methods
    function handleCompositionStart(): void {
      isComposingRef.value = true;
    }

    function handleCompositionEnd(e: CompositionEvent): void {
      isComposingRef.value = false;
      if (e.target === inputEl2Ref.value) handleInput(e, 1);
      else handleInput(e, 0);
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

    function dealWithEvent(e: FocusEvent, type: 'focus' | 'blur'): void {
      if (
        e.relatedTarget !== null &&
        (e.relatedTarget === inputElRef.value ||
          e.relatedTarget === inputEl2Ref.value ||
          e.relatedTarget === textareaElRef.value ||
          e.relatedTarget === wrapperElRef.value)
      )
        return;

      switch (type) {
        case 'focus':
          doFocus(e);
          focusedRef.value = true;
          break;
        case 'blur':
          doBlur(e);
          focusedRef.value = false;
      }
    }

    function handleInputBlur(e: FocusEvent): void {
      doUpdateValueBlur(e);
      if (e.relatedTarget === wrapperElRef.value) doDeactivate();
      if (
        e.relatedTarget === null ||
        (e.relatedTarget !== inputElRef.value &&
          e.relatedTarget !== inputEl2Ref.value &&
          e.relatedTarget !== textareaElRef.value)
      )
        activatedRef.value = false;
      dealWithEvent(e, 'blur');
    }

    function handleInputFocus(e: FocusEvent): void {
      doUpdateValueFocus(e);
      focusedRef.value = true;
      activatedRef.value = true;
      doActivate();
      dealWithEvent(e, 'focus');
    }

    function handleWrapperBlur(e: FocusEvent): void {
      if (!props.passivelyActivated) return;
      doWrapperBlur(e);
      dealWithEvent(e, 'blur');
    }

    function handleWrapperFocus(e: FocusEvent): void {
      if (!props.passivelyActivated) return;
      focusedRef.value = true;
      doWrapperFocus(e);
      dealWithEvent(e, 'focus');
    }

    function handleMouseEnter(): void {
      hoverRef.value = true;
    }

    function handleMouseLeave(): void {
      hoverRef.value = false;
    }

    function handlePasswordToggleClick(): void {
      if (mergedDisabledRef.value) return;
      passwordVisibleRef.value = !passwordVisibleRef.value;
    }

    function handlePasswordToggleMousedown(e: MouseEvent): void {
      if (mergedDisabledRef.value) return;
      e.preventDefault();
    }

    function handlePasswordToggleMouseup(e: MouseEvent): void {
      if (mergedDisabledRef.value) return;
      e.preventDefault();
    }

    function handleWrapperKeyDownEnter(e: KeyboardEvent): void {
      if (!props.passivelyActivated) return;
      const focused = activatedRef.value;
      if (focused) {
        if (props.internalDeactivateOnEnter) handleWrapperKeyDownEsc();
        return;
      }
      e.preventDefault();
      if (props.type === 'textarea') textareaElRef.value?.focus();
      else inputElRef.value?.focus();
    }

    function handleWrapperKeyDown(e: KeyboardEvent): void {
      props.onKeydown?.(e);
      switch (e.code) {
        case 'Escape':
          handleWrapperKeyDownEsc();
          break;
        case 'Enter':
        case 'NumpadEnter':
          handleWrapperKeyDownEnter(e);
          break;
      }
    }

    function handleChange(e: Event, index?: 0 | 1): void {
      handleInput(e, index, 'change');
    }

    function handleClick(e: MouseEvent): void {
      doClick(e);
    }

    function handleClear(e: MouseEvent): void {
      doClear(e);
      if (props.pair) doUpdateValue(['', '']);
      else doUpdateValue('');
    }

    function handleMouseDown(e: MouseEvent): void {
      props.onMousedown?.(e);
      const { tagName } = e.target as HTMLElement;
      if (tagName === 'INPUT' || tagName === 'TEXTAREA') return;
      if (props.resizable) {
        const wrapperEl = wrapperElRef.value;
        if (wrapperEl) {
          const { left, top, width, height } = wrapperEl.getBoundingClientRect();
          const resizeHandleSize = 14;
          if (
            left + width - resizeHandleSize < e.clientX &&
            e.clientX < left + width &&
            top + height - resizeHandleSize < e.clientY &&
            e.clientY < top + height
          )
            return;
        }
      }
      e.preventDefault();
      if (!focusedRef.value) focus();
    }

    function handleWrapperKeyDownEsc(): void {
      if (!props.passivelyActivated) return;
      activatedRef.value = false;
      void nextTick(() => wrapperElRef.value?.focus());
    }

    function handleTextAreaMirrorResize(): void {
      updateTextAreaStyle();
    }

    function focus(): void {
      if (mergedDisabledRef.value) return;
      if (props.passivelyActivated) wrapperElRef.value?.focus();
      else {
        textareaElRef.value?.focus();
        inputElRef.value?.focus();
      }
    }

    function blur(): void {
      if (mergedDisabledRef.value) return;
      if (props.passivelyActivated) wrapperElRef.value?.focus();
      else {
        textareaElRef.value?.focus();
        inputElRef.value?.focus();
      }
    }

    function activate(): void {
      if (mergedDisabledRef.value) return;
      if (textareaElRef.value) textareaElRef.value.focus();
      else if (inputElRef.value) inputElRef.value.focus();
    }

    function deactivate(): void {
      const wrapperEl = wrapperElRef.value;
      if (wrapperEl?.contains(document.activeElement) && wrapperEl !== document.activeElement)
        handleWrapperKeyDownEsc();
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

    let stopWatchMergedValue: WatchStopHandle | null = null;
    watchEffect(() => {
      const { autosize, type } = props;
      if (autosize && type === 'textarea')
        stopWatchMergedValue = watch(mergedValueRef, (value) => {
          if (Array.isArray(value) || value === syncSource) return;
          syncMirror(value);
        });
      else stopWatchMergedValue?.();
    });

    onMounted(() => {
      const value = mergedValueRef.value;
      if (!Array.isArray(value)) {
        syncMirror(value);
      }
    });

    provide(inputInjectionKey, {
      wordCountRef: computed(() => {
        const mergedValue = mergedValueRef.value;
        if (mergedValue === null || Array.isArray(mergedValue)) return 0;
        return mergedValue.length;
      }),
      mergedClsPrefixRef,
      maxlengthRef,
    });

    const exposedProps: InputWrappedRef = {
      wrapperElRef,
      inputElRef,
      textareaElRef,
      isCompositing: isComposingRef,
      focus,
      blur,
      activate,
      deactivate,
    };
    return {
      ...exposedProps,
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
      mergedSize: mergedSizeRef,
      mergedDisabled: mergedDisabledRef,
      mergedValue: mergedValueRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedFocus: mergedFocusRef,
      mergedBordered: mergedBorderedRef,
      mergedPlaceholder: mergedPlaceholderRef,
      showPlaceholder1: showPlaceholder1Ref,
      showPlaceholder2: showPlaceholder2Ref,
      textDecorationStyle: textDecorationStyleRef,
      //methods
      handleCompositionStart,
      handleCompositionEnd,
      handleInput,
      handleInputBlur,
      handleInputFocus,
      handleWrapperBlur,
      handleWrapperFocus,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseDown,
      handleChange,
      handleClick,
      handleClear,
      handlePasswordToggleClick,
      handlePasswordToggleMousedown,
      handlePasswordToggleMouseup,
      handleWrapperKeyDown,
      handleTextAreaMirrorResize,
      mergedTheme: themeRef,
      cssVars: computed(() => {
        const size = mergedSizeRef.value;
        const {
          common: { cubicBezierEaseInOut },
          self: {
            countTextColor,
            color,
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
            [createKey('padding', size)]: padding,
            [createKey('fontSize', size)]: fontSize,
            [createKey('height', size)]: height,
          },
        } = themeRef.value;
        const { left: paddingLeft, right: paddingRight } = getPadding(padding);

        return {
          '--bezier': cubicBezierEaseInOut,
          '--count-text-color': countTextColor,
          '--color': color,
          '--height': height,
          '--padding-left': paddingLeft,
          '--padding-right': paddingRight,
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
        } as CSSProperties;
      }),
    };
  },
  render({ mergedClsPrefix }) {
    return (
      <div
        ref="wrapperElRef"
        class={[
          `${mergedClsPrefix}-input`,
          {
            [`${mergedClsPrefix}-input--disabled`]: this.mergedDisabled,
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
        tabindex={
          !this.mergedDisabled && this.passivelyActivated && !this.activated ? 0 : undefined
        }
        onFocus={this.handleWrapperFocus}
        onClick={this.handleClick}
        onMousedown={this.handleMouseDown}
        onMouseenter={this.handleMouseEnter}
        onMouseleave={this.handleMouseLeave}
        onCompositionstart={this.handleCompositionStart}
        onCompositionend={this.handleCompositionEnd}
        onKeyup={this.onKeyup}
        onKeydown={this.handleWrapperKeyDown}
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
                {...this.inputProps}
                ref="textareaElRef"
                class={`${mergedClsPrefix}-input__textarea-el`}
                autofocus={this.autofocus}
                rows={Number(this.rows)}
                placeholder={this.placeholder as string | undefined}
                value={this.mergedValue as string | undefined}
                disabled={this.mergedDisabled}
                maxlength={this.maxlength}
                minlength={this.minlength}
                readonly={this.readonly as any}
                tabindex={this.passivelyActivated && !this.activated ? -1 : undefined}
                style={this.textDecorationStyle[0]}
                onBlur={this.handleInputBlur}
                onFocus={this.handleInputFocus}
                onInput={this.handleInput}
                onChange={this.handleChange}
              />
              {this.showPlaceholder1 ? (
                <div class={`${mergedClsPrefix}-input__placeholder`} key="placeholder">
                  {this.mergedPlaceholder[0]}
                </div>
              ) : null}
              {}
            </div>
          ) : (
            <div class={`${mergedClsPrefix}-input__input`}>
              <input
                {...this.inputProps}
                ref="inputElRef"
                type={
                  this.type === 'password' && this.showPasswordToggle && this.passwordVisible
                    ? 'text'
                    : this.type
                }
                class={`${mergedClsPrefix}-input__input-el`}
                tabindex={this.passivelyActivated && !this.activated ? -1 : undefined}
                placeholder={this.mergedPlaceholder[0]}
                disabled={this.mergedDisabled}
                maxlength={this.maxlength}
                minlength={this.minlength}
                value={
                  Array.isArray(this.mergedValue) ? this.mergedValue[0] : (this.mergedValue as any)
                }
                readonly={this.readonly as any}
                autofocus={this.autofocus}
                size={this.attrSize}
                style={this.textDecorationStyle[0]}
                onBlur={this.handleInputBlur}
                onFocus={this.handleInputFocus}
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
            <div class={`${mergedClsPrefix}-input__suffix`}>
              {[
                this.clearable || this.$slots.clear ? (
                  <BaseClear
                    clsPrefix={mergedClsPrefix}
                    show={this.showClearButton}
                    onClear={this.handleClear}
                  >
                    {{
                      default: () => renderSlot(this.$slots, 'clear'),
                    }}
                  </BaseClear>
                ) : null,
                renderSlot(this.$slots, 'suffix'),
                this.showCount && this.type !== 'textarea' ? <WordCount /> : null,
                this.showPasswordToggle && this.type === 'password' ? (
                  <BaseIcon
                    clsPrefix={mergedClsPrefix}
                    class={`${mergedClsPrefix}-input__eye`}
                    onMousedown={this.handlePasswordToggleMousedown}
                    onMouseup={this.handlePasswordToggleMouseup}
                  >
                    {{
                      default: () => (this.passwordVisible ? <Eye /> : <EyeOff />),
                    }}
                  </BaseIcon>
                ) : null,
              ]}
            </div>
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
                style={this.textDecorationStyle[1]}
                onBlur={this.handleInputBlur}
                onFocus={this.handleInputFocus}
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
        {this.mergedBordered ? <div class={`${mergedClsPrefix}-input__border`} /> : null}
        {this.mergedBordered ? <div class={`${mergedClsPrefix}-input__state-border`} /> : null}
        {this.showCount && this.type === 'textarea' ? <WordCount /> : null}
      </div>
    );
  },
});
