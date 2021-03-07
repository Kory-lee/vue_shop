import { LAYOUT } from '../../constant';
import { t } from '/@/plugins/i18n';
import type { AppRouteModule } from '/@/router/types';
export default {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  meta: { title: t('common.home'), icon: 'ion:home-outline' },
  children: [
    {
      path: 'welcome',
      name: 'Welcome',
      component: () => import('/@/views/dashboard/welcome/index.vue'),
      meta: { title: t('common.home'), affix: true, icon: 'ion:home-outline' },
    },
  ],
} as AppRouteModule;
