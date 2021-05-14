export const REDIRECT_NAME = 'Redirect';

export const PARENT_LAYOUT_NAME = 'ParentLayout';

export const EXCEPTION_COMPONENT = () => import('/@/views/sys/exception/index.vue');

export const LAYOUT = () => import('/@/layouts/default/index.vue');

export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({ name: PARENT_LAYOUT_NAME });
    });
};
