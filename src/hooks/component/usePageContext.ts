import type { ComputedRef, InjectionKey, Ref } from 'vue';
import { createContext, useContext } from '/@/hooks/core/useContext';

export interface PageContextProps {
  contentHeight: ComputedRef<number>;
  pageHeight: Ref<number>;
  setPageHeight: (height: number) => Promise<void>;
}

const key: InjectionKey<PageContextProps> = Symbol();

export function createPageContext(context: PageContextProps) {
  return createContext(context, key);
}

export function usePageContext() {
  return useContext(key);
}
