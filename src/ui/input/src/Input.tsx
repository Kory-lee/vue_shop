import type { CSSProperties, PropType } from 'vue';
import type { Size } from '/@/ui/input/src/interface';

import { ref, computed, defineComponent, renderSlot } from 'vue';
import { useTheme } from '/@/ui/_mixins/use-theme';
import style from './styles/input.cssr';
import inputLight from '/@/ui/input/styles/light';
import useConfig from '../../_mixins/use-config';

const inputProps = {
  ...useTheme.props,
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
  size: String as PropType<Size>,
  rows: {
    type: [Number, String] as PropType<number | string>,
    default: 3,
  },
  round: Boolean,
  minlength: [String, Number] as PropType<number | string>,
};

export default defineComponent({
  name: 'Input',
  props: inputProps,
  setup(props) {
    const { mergedClsPrefixRef, mergedBorderedRef } = useConfig(props);
    const themeRef = useTheme('Input', 'Input', style, inputLight, props);
    console.log(themeRef, inputLight);
    const wrapperElRef = ref<HTMLElement | null>(null),
      textareaElRef = ref<HTMLTextAreaElement | null>(null);

    const cssVars = computed(() => {
      const {
        common: { cubicBezierEaseInOut },
        self: {},
      } = themeRef.value;
      return {
        '--bezier': cubicBezierEaseInOut,
        '--height': '20px',
      } as CSSProperties;
    });
    return {
      mergedClsPrefix: mergedClsPrefixRef,
      mergedBordered: mergedBorderedRef,
      wrapperElRef,
      textareaElRef,
      cssVars,
    };
  },
  render() {
    const { mergedClsPrefix } = this;
    return (
      <div ref="wrapperElRef" class={[`${mergedClsPrefix}-input`, {}]} style={this.cssVars}>
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
              <textarea ref="textareaElRef" class={`${mergedClsPrefix}-input__textarea-el`} />
              {}
            </div>
          ) : (
            <div>test</div>
          )}
        </div>
      </div>
    );
  },
});
