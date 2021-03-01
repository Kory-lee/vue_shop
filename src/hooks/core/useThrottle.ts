import type {
  DebounceAndThrottleOptions,
  DebounceAndThrottleProcedure,
  DebounceAndThrottleProcedureResult,
} from './useDebounce';
import { isFunction } from '/@/utils/is';

export function throttle<T extends unknown[]>(
  handle: DebounceAndThrottleProcedure<T>,
  wait: number,
  options: DebounceAndThrottleOptions = {}
): DebounceAndThrottleProcedureResult<T> {
  if (!isFunction(handle)) throw new Error('handle is not Function!');
  let { immediate = false } = options;
  const { once = false, debounce = false } = options;
  let timeoutId: Nullable<TimeoutHandle>,
    cancelled: boolean | null = false;
  function clearTimer() {
    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  }
  function cancel() {
    clearTimer();
    cancelled = true;
  }

  function cancelExec(): void {
    once && cancel();
  }
  function fn(this: unknown, ...args: T) {
    if (cancelled) return;
    const exec = () => {
      !debounce && clearTimer();
      handle.apply(this, args);
      cancelExec();
    };
    if (immediate) {
      immediate = false;
      if (!timeoutId) {
        exec();
        timeoutId = null;
      }
    } else {
      debounce && clearTimer();
      if (!timeoutId || debounce) timeoutId = setTimeout(exec, wait);
    }
  }
  return [fn, cancel];
}

export function useThrottle<T extends unknown[]>(
  handle: DebounceAndThrottleProcedure<T>,
  wait: number,
  options: DebounceAndThrottleOptions = {}
): DebounceAndThrottleProcedureResult<T> {
  return throttle(handle, wait, options);
}
