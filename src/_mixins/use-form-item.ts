import { computed, ComputedRef, inject, InjectionKey, onBeforeUnmount, provide, Ref } from 'vue';

type FormItemSize = 'small' | 'medium' | 'large';
type AllowedSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | number;

export interface FormItemInjection {
  path: Ref<string | undefined>;
  disabled: Ref<boolean>;
  mergedSize: ComputedRef<FormItemSize>;
  restoreValidation: () => void;
  handleContentBlur: () => void;
  handleContentFocus: () => void;
  handleContentInput: () => void;
  handleContentChange: () => void;
}

interface UseFormItemOptions<T> {
  defaultSize?: FormItemSize;
  mergedSize?: (formItem: FormItemInjection | null) => T;
  mergedDisabled?: (formItem: FormItemInjection | null) => boolean;
}

interface UseFormItemProps<T> {
  size?: T;
  disabled?: boolean;
}

export interface UseFormItem<T> {
  mergedSizeRef: ComputedRef<T>;
  mergedDisabledRef: ComputedRef<boolean>;
  triggerFormBlur: () => void;
  triggerFormChange: () => void;
  triggerFormFocus: () => void;
  triggerFormInput: () => void;
}

export const formItemInjectionKey: InjectionKey<FormItemInjection> = Symbol('formItem');

export default function useFormItem<T extends AllowedSize = FormItemSize>(
  props: UseFormItemProps<T>,
  { defaultSize = 'medium', mergedSize, mergedDisabled }: UseFormItemOptions<T> = {}
): UseFormItem<T> {
  const KFormItem = inject(formItemInjectionKey, null);
  provide(formItemInjectionKey, null);
  const mergedSizeRef = computed(
    mergedSize
      ? () => mergedSize(KFormItem)
      : () => {
          const { size } = props;
          if (size) return size;
          if (KFormItem) {
            const { mergedSize } = KFormItem;
            if (mergedSize.value !== undefined) return mergedSize.value as T;
          }
          return defaultSize as T;
        }
  );
  const mergedDisabledRef = computed(
    mergedDisabled
      ? () => mergedDisabled(KFormItem)
      : () => {
          const { disabled } = props;
          if (disabled !== undefined) return disabled;
          if (KFormItem) return KFormItem.disabled.value;
          return false;
        }
  );
  onBeforeUnmount(() => {
    KFormItem?.restoreValidation();
  });
  return {
    mergedSizeRef,
    mergedDisabledRef,
    triggerFormBlur() {
      KFormItem?.handleContentBlur();
    },
    triggerFormChange() {
      KFormItem?.handleContentChange();
    },
    triggerFormFocus() {
      KFormItem?.handleContentFocus();
    },
    triggerFormInput() {
      KFormItem?.handleContentInput();
    },
  };
}
