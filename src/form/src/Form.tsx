import { ValidateError } from 'async-validator';
import { defineComponent, ExtractPropTypes, PropType, provide, ref } from 'vue';
import formLight, { FormTheme } from '../styles/light';
import { formInjectionKey, formItemInstsInjectionKey } from './context';
import {
  FormRules,
  FormValidateCallback,
  FormValidateMessages,
  LabelAlign,
  LabelPlacement,
  ShouldRuleBeApplied,
  Size,
} from './interface';
import { useTheme, useConfig } from '/@/_mixins';
import { ThemeProps } from '/@/_mixins/use-theme';
import { ExtractPublicPropTypes } from '/@/_utils/ui';

const formProps = {
  ...(useTheme.props as ThemeProps<FormTheme>),
  inline: Boolean,
  labelWidth: [Number, String] as PropType<number | string>,
  labelAlign: String as PropType<LabelAlign>,
  labelPlacement: {
    type: String as PropType<LabelPlacement>,
    default: 'top',
  },
  model: {
    type: Object as PropType<Record<string, any>>,
    defualt: () => ({}),
  },
  rules: Object as PropType<FormRules>,
  disabled: Boolean,
  size: String as PropType<Size>,
  showRequiedMark: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  requireMarkPlacement: String as PropType<'left' | 'right' | 'right-hanging'>,
  showFeedback: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  onSubmit: {
    type: Function as PropType<(e: Event) => void>,
    default: (e: Event) => e.preventDefault(),
  },
  showLabel: {
    type: Boolean as PropType<boolean | undefined>,
    default: undefined,
  },
  validateMessages: Object as PropType<Partial<FormValidateMessages>>,
};

export type FormSetupProps = ExtractPropTypes<typeof formProps>;
export type FormProps = ExtractPublicPropTypes<typeof formProps>;

export default defineComponent({
  name: 'Form',
  props: formProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    useTheme('Form', '-form', undefined, formLight, props, mergedClsPrefixRef);

    const formItems = {};
    const maxChildLabelWidthRef = ref<undefined | number>(undefined);
    function deriveMaxChildLabelWidth(currentWidth: number): void {
      const currentMaxChildLabelWidth = maxChildLabelWidthRef.value;
      if (currentMaxChildLabelWidth === undefined || currentWidth > currentMaxChildLabelWidth) {
        maxChildLabelWidthRef.value = currentWidth;
      }
    }
    provide(formItemInstsInjectionKey, formItems);
    provide(formInjectionKey, {
      props,
      deriveMaxChildLabelWidth,
      maxChildLabelWidthRef,
    });
    function validate(
      validateCallback: FormValidateCallback,
      shouldRuleBeApplied: ShouldRuleBeApplied = () => true
    ): Promise<void> {
      return new Promise((resolve, reject) => {
        const formItemValidationPromises: Array<
          Promise<{
            valid: boolean;
            errors?: ValidateError[];
          }>
        > = [];
        for (const key of Object.keys(formItems)) {
          const formItemInstances = formItems[key];
          for (const formItemInstance of formItemInstances) {
            if (!formItemInstance.path) continue;
            formItemValidationPromises.push(
              formItemInstance.internalValidate(null, shouldRuleBeApplied)
            );
          }
        }
        void Promise.all(formItemValidationPromises).then((results) => {
          if (results.some((result) => !result.valid)) {
            const errors = results.filter((result) => !result.valid).map((result) => result.errors);
            if (validateCallback) validateCallback(errors as ValidateError[][]);
            return reject(results);
          }
          if (validateCallback) validateCallback();
          return resolve();
        });
      });
    }
    function restoreValidation(): void {
      for (const key of Object.keys(formItems)) {
        const formItemInstances = formItems[key];
        for (const formItemInstance of formItemInstances) {
          formItemInstance.restoreValidation();
        }
      }
    }

    const formExposedMethods = {
      validate,
      restoreValidation,
    };
    return Object.assign(formExposedMethods, {
      mergedClsPrefix: mergedClsPrefixRef,
    });
  },
  render() {
    const { mergedClsPrefix } = this;
    return (
      <form class={[`${mergedClsPrefix}-form`, this.inline && `${mergedClsPrefix}-form--inline`]}>
        {this.$slots}
      </form>
    );
  },
});
