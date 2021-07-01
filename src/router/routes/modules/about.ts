import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { useI18n } from '/@/i18n/useI18n';

const { t } = useI18n();
export default {
  path: '/',
  name: 'About',
  component: LAYOUT,
  redirect: '/about',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: t('routes.dashboard.about'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'about',
      name: 'AboutPage',
      component: () => import('/@/views/about/index.vue'),
      meta: {
        title: t('routes.dashboard.about'),
        icon: 'simple-icons:about-dot-me',
      },
    },
  ],
} as AppRouteModule;
