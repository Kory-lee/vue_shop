import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { useI18n } from '/@/i18n/useI18n';

const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue');
const { t } = useI18n();

const iframe: AppRouteModule = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,
  redirect: '/frame/doc',
  meta: {
    icon: 'ion:tv-outline',
    title: t('routes.demo.iframe.frame'),
  },
  children: [
    {
      path: 'doc',
      name: 'Doc',
      component: IFrame,
      meta: {
        frameSrc: 'https://vvbin.cn/doc-next/',
        title: t('routes.demo.iframe.doc'),
      },
    },
    {
      path: 'antv',
      name: 'Antv',
      component: IFrame,
      meta: {
        frameSrc: 'https://2x.antdv.com/docs/vue/introduce-cn/',
        title: t('routes.demo.iframe.antv'),
      },
    },
  ],
};

export default iframe;
