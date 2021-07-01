import type { AppRouteRecordRaw } from '/@/router/types';

import { useI18n } from '/@/i18n/useI18n';
import { EXCEPTION_COMPONENT, LAYOUT, REDIRECT_NAME } from '/@/router/constant';

const { t } = useI18n();
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'ErrorPage',
  component: LAYOUT,
  meta: { title: 'ErrorPage', hideBreadcrumb: true, hideMenu: true },
  children: [
    {
      path: '/:path(.*)*',
      name: 'ErrorPage',
      component: EXCEPTION_COMPONENT,
      meta: { title: 'ErrorPage', hideBreadcrumb: true },
    },
  ],
};

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  name: REDIRECT_NAME,
  meta: { title: REDIRECT_NAME, hideBreadcrumb: true, hideMenu: true },
  component: LAYOUT,
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('/@/views/sys/redirect'),
      meta: { title: REDIRECT_NAME, hideBreadcrumb: true },
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
