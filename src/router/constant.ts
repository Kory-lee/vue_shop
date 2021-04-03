import { t } from '../hooks/web/useI18n';
import { AppRouteRecordRaw } from './types';

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

const redirect_meta = { title: REDIRECT_NAME, hideBreadcrumb: true };
export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  name: REDIRECT_NAME,
  meta: redirect_meta,
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('/@/views/sys/redirect'),
      meta: redirect_meta,
    },
  ],
};

export const ERROR_LOG_ROUTE: AppRouteRecordRaw = {
  path: '/error-log',
  name: 'errorLog',
  component: LAYOUT,
  meta: { title: 'errorLog', hideBreadcrumb: true },
  children: [
    {
      path: 'list',
      name: 'errorLogList',
      component: () => {},
      meta: { title: t('routes.basic.errorLogList'), hideBreadcrumb: true },
    },
  ],
};
