export { default as Logo } from './src/Logo.vue';
export { default as Provider } from './src/Provider';
export { createProviderContext, customizePrefixCls, useProviderContext };
export type { ProviderContextProps };

import {
  createProviderContext,
  customizePrefixCls,
  ProviderContextProps,
  useProviderContext,
} from './src/Provider/useAppContext';
import createAsyncComponent from '/@/utils/factory/createAsyncComponent';

export const LocalePicker = createAsyncComponent(() => import('./src/LocalePicker.vue'));
