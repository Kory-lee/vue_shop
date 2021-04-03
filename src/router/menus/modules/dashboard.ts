import { MenuModule } from '../../types';
import { t } from '../../../locales/useI18n';

export default {
  orderNo: 10,
  menu: {
    name: t('routes.dashboard.dashboard'),
    path: '/dashboard',
    children: [
      { path: 'workbench', name: t('routes.dashboard.workbench') },
      { path: 'analysis', name: t('routes.dashboard.analysis') },
    ],
  },
} as MenuModule;
