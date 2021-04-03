import {
  DebounceAndThrottleOptions,
  DebounceAndThrottleProcedure,
  DebounceAndThrottleProcedureResult,
  throttle,
} from './useThrottle';

export function useDebounce<T extends unknown[]>(
  handle: DebounceAndThrottleProcedure<T>,
  wait: number,
  options: DebounceAndThrottleOptions = {}
): DebounceAndThrottleProcedureResult<T> {
  return throttle(handle, wait, Object.assign(options, { debounce: true }));
}
