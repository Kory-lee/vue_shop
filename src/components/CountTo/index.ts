import createAsyncComponent from '/@/utils/factory/createAsyncComponent';

export const CountTo = createAsyncComponent(() => import('./src/CountTo.vue'));

export default CountTo;
