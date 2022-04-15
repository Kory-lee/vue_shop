import type { RuleItem, ValidateError, ValidateMessages } from 'async-validator';
import type { Ref } from 'vue';
import type { FormSetupProps } from './Form';

export interface FormRules {
  [path: string]: FormRules | FormItemRule | FormItemRule[];
}

type SetRule<T, R> = T extends (rule: any, ...args: infer K) => infer P
  ? (rule: R, ...args: K) => P
  : never;

export type FormItemRuleValidatorParams = Parameters<
  SetRule<NonNullable<RuleItem['validator']>, FormItemRule>
>;

export type FormItemRuleAsyncValidator = (
  ...args: FormItemRuleValidatorParams
) => Promise<void> | undefined;

export type FormItemRuleValidator = (
  ...args: FormItemRuleValidatorParams
) => boolean | Error | Error[] | Promise<void> | undefined;

export type FormItemRule = Omit<RuleItem, 'validator' | 'asyncValidator'> & {
  key?: string;
  trigger?: ValidationTrigger | string | Array<ValidationTrigger | string>;
  validator?: FormItemRuleValidator;
  asyncValidator?: FormItemRuleAsyncValidator;
};

export interface FormInjection {
  props: FormSetupProps;
  maxChildLabelWidthRef: Ref<number | undefined>;
  deriveMaxChildLabelWidth: (currentWidth: number) => void;
}

export type LabelAlign = 'left' | 'center' | 'right';
export type LabelPlacement = 'left' | 'top';
export type Size = 'small' | 'medium' | 'large';

export type ValidationTrigger = 'input' | 'change' | 'blur' | 'focus';

export type ShouldRuleBeApplied = (rule: FormItemRule) => boolean;
export type FormValidateCallback = (errors?: ValidateError[][]) => void;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface FormValidateMessages extends ValidateMessages {}
