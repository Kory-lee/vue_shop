import { ComponentInternalInstance, getCurrentInstance } from 'vue';

export function tryTsxEmit<T extends any = ComponentInternalInstance>(
  fn: (_instance: T) => Promise<void> | void
) {
  const instance = getCurrentInstance() as any;
  instance && fn.call(null, instance);
}
