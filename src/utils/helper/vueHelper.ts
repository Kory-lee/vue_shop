import {
  ComponentInternalInstance,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
} from 'vue';

export function tryTsxEmit<T extends any = ComponentInternalInstance>(
  fn: (_instance: T) => Promise<void> | void
) {
  const instance = getCurrentInstance() as any;
  instance && fn.call(null, instance);
}

export function tryOnMounted(fn: () => void, sync = true) {
  if (getCurrentInstance()) onMounted(fn);
  else if (sync) fn();
  else nextTick(fn);
}

export function tryOnUnmounted(fn: () => Promise<void> | void) {
  getCurrentInstance() && onUnmounted(fn);
}
