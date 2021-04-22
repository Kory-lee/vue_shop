import { t } from '/@/i18n/useI18n';
import { LAYOUT } from '/@/router/constant';
import { AppRouteModule } from '/@/router/types';

export default {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/welcome',
  meta: { icon: 'bx:bx-home', title: t('layout.header.home') },
  children: [
    {
      path: 'welcome',
      name: 'Welcome',
      component: () => import('/@/views/dashboard/welcome/index.vue'),
      meta: { title: t('layout.header.home'), affix: true, icon: 'bx:bx-home' },
    },
  ],
} as AppRouteModule;
