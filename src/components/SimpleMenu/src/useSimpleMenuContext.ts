import { InjectionKey, Ref } from 'vue';
import { createContext, useContext } from '/@/hooks/core/useContext';
import Mitt from '/@/utils/mitt';

export interface SimpleRootMenuContextProps {
  rootMenuEmitter: Mitt;
  activeName: Ref<string | number>;
}

const key: InjectionKey<SimpleRootMenuContextProps> = Symbol();

export function createSimpleRootMenuContext(context: SimpleRootMenuContextProps) {
  return createContext(context, key);
}

export function useSimpleRootMenuContext() {
  return useContext(key);
}
