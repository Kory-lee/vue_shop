import type { MenuModule } from '/@/router/types';

import { useI18n } from '/@/i18n/useI18n';
const { t } = useI18n();

export default {
  orderNo: 15,
  menu: {
    name: t('routes.demo.permission.permission'),
    path: '/permission',
    children: [
      {
        path: 'front',
        name: t('routes.demo.permission.front'),
        children: [
          {
            path: 'page',
            name: t('routes.demo.permission.frontPage'),
          },
        ],
      },
    ],
  },
} as MenuModule;
