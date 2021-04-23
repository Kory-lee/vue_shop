import { inject, InjectionKey, provide, ShallowUnwrapRef } from 'vue';

export interface CreateContextOptions {
  readonly?: boolean;
  native?: boolean;
}

export function createContext<T>(context: any, key: InjectionKey<T> = Symbol()) {
  provide(key, context);
}

export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;
export function useContext<T>(key: InjectionKey<T>, defaultValue?: any, native?: boolean): T;

export function useContext<T>(
  key: InjectionKey<T> = Symbol(),
  defaultValue?: any
): ShallowUnwrapRef<T> {
  return inject(key, defaultValue || {});
}
