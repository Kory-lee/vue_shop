import type { InjectionKey, Ref } from 'vue';

export type InputSize = 'tiny' | 'small' | 'medium' | 'large';

export type OnUpdateValue = <T extends string & [string, string]>(value: T) => void;

export type OnUpdateValueImpl = (value: string | [string, string]) => void;

export interface InputWrappedRef {
  wrapperElRef: Ref<HTMLElement | null>;
  textareaElRef: Ref<HTMLTextAreaElement | null>;
  inputElRef: Ref<HTMLInputElement | null>;
  isCompositing: Ref<boolean>;
  blur: () => void;
  focus: () => void;
  activate: () => void;
  deactivate: () => void;
}

export const inputInjectionKey: InjectionKey<{
  wordCountRef: Ref<number>;
  maxlengthRef: Ref<number | undefined>;
  mergedClsPrefixRef: Ref<string>;
}> = Symbol('input');
