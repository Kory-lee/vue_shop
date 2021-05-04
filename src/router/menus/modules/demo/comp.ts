import { useI18n } from '/@/i18n/useI18n';
import type { MenuModule } from '/@/router/types';

const { t } = useI18n();
const menu: MenuModule = {
  orderNo: 30,
  menu: {
    name: t('routes.demo.comp.comp'),
    path: '/comp',
    tag: { dot: true },
    children: [
      { path: 'basic', name: t('routes.demo.comp.basic') },
      {
        path: 'form',
        name: t('routes.demo.comp.form.form'),
        children: [{ path: 'basic', name: t('routes.demo.comp.form.basic') }],
      },
    ],
  },
};

export default menu;
