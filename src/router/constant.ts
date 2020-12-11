import { AppRouteRecordRaw } from './types';

const EXCEPTION_COMPONENT = () => import('/@/views/sys/exception/index.vue');

export const LAYOUT = () => import('/@/layouts/default/index');

export const getParentLayout = (name: string) => {
  return () => new Promise((resolve) => resolve({ name }));
};

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: () => import('/@/views/sys/exception/index.vue'),
  meta: { title: 'ErrorPage', hideBreadcrumb: true },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPage',
      component: EXCEPTION_COMPONENT,
      meta: { title: 'ErrorPage', hideBreadcrumb: true },
    },
  ],
};

export const REDIRECT_NAME = 'redirect';

const redirect_meta = { title: REDIRECT_NAME, hideBreadcrumb: true };
export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  name: REDIRECT_NAME,
  meta: redirect_meta,
  children: [
    {
      path: '/redirect',
      name: REDIRECT_NAME,
      component: () => import('/@/view/sys/redirect/index.vue'),
      meta: redirect_meta,
    },
  ],
};
