import modules from 'globby!/@/router/routes/modules/**/*.@(ts)';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '../constant';
import { PageEnum } from '/@/enums/PageEnum';
import { useI18n } from '/@/plugins/i18n';
import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/types';
const routeModuleList: AppRouteModule[] = [];

const { t } = useI18n('routes.basic');
// 浅复制
Object.keys(modules).forEach((key) => {
  const mod = Array.isArray(modules[key]) ? [...modules[key]] : [modules[key]];
  routeModuleList.push(...mod);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: { title: 'Root' },
  children: [
    {
      name: 'Dashboard',
      path: 'dashboard',
      meta: { title: '控制台' },
      component: () => import('/@/views/dashboard/index.vue'),
    },
  ],
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/index.vue'),
  meta: { title: t('login') },
};

// 基础路由 不用权限
export const basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE];
