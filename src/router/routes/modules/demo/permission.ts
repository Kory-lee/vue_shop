import type { AppRouteModule } from '/@/router/types';

import { useI18n } from '/@/i18n/useI18n';
import { getParentLayout, LAYOUT } from '/@/router/constant';

const { t } = useI18n();
const permission: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/front/page',
  meta: { icon: 'ion:key-outline', title: t('routes.demo.permission.permission') },
  children: [
    {
      path: 'front',
      name: 'PermissionFrontDemo',
      component: getParentLayout('PermissionFrontDemo'),
      meta: { title: t('routes.demo.permission.front') },
      children: [
        {
          path: 'page',
          name: 'FrontPageAuth',
          component: () => import('/@/views/demo/permission/front/index.vue'),
          meta: {
            title: t('routes.demo.permission.frontPage'),
          },
        },
      ],
    },
  ],
};

export default permission;
