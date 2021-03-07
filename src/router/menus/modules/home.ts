import { t } from '/@/plugins/i18n';
import type { MenuModule } from '/@/router/types';

export default {
  orderNo: 0,
  menu: { path: '/home/welcome', name: t('routes.dashboard.welcome') },
} as MenuModule;
