import { ref, watch } from 'vue';
import { tryOnUnmounted } from '/@/utils/helper/vueHelper';
import { isFunction } from '/@/utils/is';

// 用customRef 会不会更好！
export function useTimeoutFn(handle: Fn<any>, wait: number, native = false) {
  if (!isFunction(handle)) throw new Error('handle is not function');
  const { readyRef, stop, start } = timeoutRef(wait);
  if (native) handle();
  else
    watch(
      readyRef,
      (maturity) => {
        maturity && handle();
      },
      { immediate: true }
    );
  return { readyRef, stop, start };
}

export function timeoutRef(wait: number) {
  const readyRef = ref(false);
  let timer: TimeoutHandle;
  function stop(): void {
    readyRef.value = true;
    timer && window.clearTimeout(timer);
  }
  function start() {
    stop();
    timer = setTimeout(() => {
      readyRef.value = true;
    }, wait);
  }
  start();
  tryOnUnmounted(stop);
  return { stop, readyRef, start };
}
