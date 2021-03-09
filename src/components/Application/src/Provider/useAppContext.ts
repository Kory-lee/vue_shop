import { Ref } from 'vue';
import { createContext, useContext } from '/@/hooks/core/useContext';
import styleSetting from '/@/settings/styleSetting';
export interface ProviderContextProps {
  getPrefixCls: Fn<string>;
  isMobile: Ref<boolean>;
}
const key = Symbol();

export function createProviderContext(context) {
  return createContext<ProviderContextProps>(context, key);
}

export const customizePrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) return customizePrefixCls;
  return `${styleSetting.prefixCls}-${suffixCls}`;
};

export function useProviderContext() {
  return useContext<ProviderContextProps>(key, { getPrefixCls: customizePrefixCls });
}
