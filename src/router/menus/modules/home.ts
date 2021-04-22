import { useI18n } from '/@/i18n/useI18n';
import type { MenuModule } from '/@/router/types';

const { t } = useI18n();
export default {
  orderNo: 0,
  menu: { path: '/home/welcome', name: t('routes.dashboard.welcome') },
} as MenuModule;
