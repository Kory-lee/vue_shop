import createAsyncComponent from '/@/utils/factory/createAsyncComponent';

export const Notify = createAsyncComponent(() => import('./notify/index.vue'));

export const ErrorAction = createAsyncComponent(() => import('./ErrorAction.vue'));
