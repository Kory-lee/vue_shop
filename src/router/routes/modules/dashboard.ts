import type { AppRouteModule } from '../../types';

import { LAYOUT } from '/@/router/constant';
import { useI18n } from '/@/i18n/useI18n';

const { t } = useI18n();
const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/workbench',
  meta: { icon: 'ion:grid-outline', title: t('routes.dashboard.dashboard') },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: { title: t('routes.dashboard.workbench') },
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: { title: t('routes.dashboard.analysis') },
    },
  ],
};

export default dashboard;
