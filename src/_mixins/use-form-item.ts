import { computed, ComputedRef, inject, InjectionKey, onBeforeUnmount, provide, Ref } from 'vue';

type FormItemSize = 'small' | 'medium' | 'large';
type AllowedSize = 'tiny' | 'small' | 'medium' | 'large' | 'huge';

export interface FormItemInjection {
  path: Ref<string | undefined>;
  mergedSize: ComputedRef<FormItemSize>;
  restoreValidation: () => void;
  handleContentBlur: () => void;
  handleContentFocus: () => void;
  handleContentInput: () => void;
  handleContentChange: () => void;
}

interface UserFOrmItemOptions<T> {
  defaultSize?: FormItemSize;
  mergedSize?: (formItem: FormItemInjection | null) => T;
}
type UseFormItemProps<T> = { size?: T };

export interface UseFormItem<T> {
  mergedSizeRef: ComputedRef<T>;
  triggerFormBlur: () => void;
  triggerFormChange: () => void;
  triggerFormFocus: () => void;
  triggerFormInput: () => void;
}

export const formItemInjectionKey: InjectionKey<FormItemInjection> = Symbol('formItem');

export default function useFormItem<T extends AllowedSize = FormItemSize>(
  props: UseFormItemProps<T>,
  { defaultSize = 'medium', mergedSize }: UserFOrmItemOptions<T> = {}
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
  onBeforeUnmount(() => {
    KFormItem?.restoreValidation();
  });
  return {
    mergedSizeRef,
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
