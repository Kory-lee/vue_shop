import { LAYOUT } from '../../constant';
import type { AppRouteModule } from '/@/router/types';
import { t } from '/@/i18n/useI18n';
export default {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  meta: { title: t('layout.header.home'), icon: 'ion:home-outline' },
  children: [
    {
      path: 'welcome',
      name: 'Welcome',
      component: () => import('/@/views/dashboard/welcome/index.vue'),
      meta: { title: t('layout.header.home'), affix: true, icon: 'ion:home-outline' },
    },
  ],
} as AppRouteModule;
