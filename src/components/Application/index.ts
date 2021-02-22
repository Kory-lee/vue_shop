import Logo from './src/Logo.vue';
import Provider from './src/Provider';
import {
  ProviderContextProps,
  createProviderContext,
  customizePrefixCls,
  useProviderContext,
} from './src/Provider/useAppContext';
export { Logo, Provider, createProviderContext, customizePrefixCls, useProviderContext };
export type { ProviderContextProps };
// export const Provider = createAsyncComponent(() => import('./Provider'));
