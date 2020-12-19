import Logo from './Logo.vue';
import createAsyncComponent from '/@/utils/factory/createAsyncComponent';
export { getPrefixCls } from './Provider';
export { Logo };


export const Provider = createAsyncComponent(() => import('./Provider/index.vue'));
