import { computed, getCurrentInstance, reactive, readonly, UnwrapRef, watchEffect } from 'vue-demi';
import isEqual from 'lodash-es/isEqual';

export function useRuleFormItem<T extends Recordable>(
  props: T,
  key: keyof T = 'value',
  changeEvent = 'change'
) {
  const instance = getCurrentInstance();
  const emit = instance?.emit;
  const innerState = reactive({ value: props[key] });
  const defaultState = readonly(innerState);

  const setState = (val: UnwrapRef<T[keyof T]>) => {
    innerState.value = val as T[keyof T];
  };

  watchEffect(() => {
    innerState.value = props[key];
  });
  const state = computed({
    get() {
      return innerState.value;
    },
    set(val) {
      if (isEqual(val, defaultState.value)) return;
      innerState.value = val as T[keyof T];
      emit?.(changeEvent, val);
    },
  });

  return [state, setState, defaultState];
}
