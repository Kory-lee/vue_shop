import createAsyncComponent from '/@/utils/factory/createAsyncComponent';

export const CountTo = createAsyncComponent(() => import('./src/index.vue'));

export default CountTo;
