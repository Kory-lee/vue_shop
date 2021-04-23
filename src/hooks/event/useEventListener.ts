import { useDebounceFn, useThrottleFn } from '@vueuse/core';
import { ref, Ref, unref, watch } from 'vue';

export type RemoveEventFn = () => void;

export interface UseEventParams {
  el?: Element | Ref<Element | undefined> | Window;
  name: string;
  listener: EventListener;
  options?: boolean | AddEventListenerOptions;
  autoRemove?: boolean;
  isDebounce?: boolean;
  wait?: number;
}

export function useEventListener({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80,
}: UseEventParams) {
  let remove: RemoveEventFn = () => {};
  const isAddRef = ref(false);
  if (unref(el)) {
    const element: Ref<Element> = ref(el as Element),
      handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait),
      realHandler = wait ? handler : listener,
      removeEventListener = (e: Element) => {
        isAddRef.value = true;
        e.removeEventListener(name, realHandler, options);
      },
      addEventListener = (e: Element) => e.addEventListener(name, realHandler, options),
      removeWatch = watch(
        element,
        (v, _ov, cleanUp) => {
          if (v) {
            !unref(isAddRef) && addEventListener(v);
            cleanUp(() => autoRemove && removeEventListener(v));
          }
        },
        { immediate: true }
      );

    remove = () => {
      removeEventListener(unref(element));
      removeWatch();
    };
  }
  return { removeEvent: remove };
}

export default useEventListener;
