import { useI18n } from '/@/i18n/useI18n';
import type { MenuModule } from '/@/router/types';

const { t } = useI18n();
const menu: MenuModule = {
  orderNo: 1000,
  menu: {
    name: t('routes.demo.iframe.frame'),
    path: '/frame',
    children: [
      {
        path: 'doc',
        name: t('routes.demo.iframe.doc'),
      },
      {
        path: 'antv',
        name: t('routes.demo.iframe.antv'),
      },
      {
        path: 'https://vvbin.cn/doc-next/',
        name: t('routes.demo.iframe.docExternal'),
      },
    ],
  },
};
export default menu;
