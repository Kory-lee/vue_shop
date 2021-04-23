import { useI18n } from '/@/i18n/useI18n';
import type { MenuModule } from '/@/router/types';

const { t } = useI18n();
export default {
  orderNo: 100000,
  menu: {
    path: '/about/index',
    name: t('routes.dashboard.about'),
  },
} as MenuModule;
