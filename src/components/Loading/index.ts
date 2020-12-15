import createAsyncComponent from '/@/utils/factory/createAsyncComponent';

const Loading = createAsyncComponent(() => import('./index.vue'));

export default Loading;
