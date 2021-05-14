import type { AppRouteRecordRaw } from '/@/router/types';

import { t } from '/@/i18n/useI18n';
import { EXCEPTION_COMPONENT, LAYOUT, REDIRECT_NAME } from '/@/router/constant';

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: LAYOUT,
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
  component: LAYOUT,
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
  redirect: '/error-log/list',
  children: [
    {
      path: 'list',
      name: 'errorLogList',
      component: () => import('/@/views/sys/error-log/index.vue'),
      meta: { title: t('routes.basic.errorLogList'), hideBreadcrumb: true },
    },
  ],
};
