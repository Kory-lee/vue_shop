import type { AppRouteModule } from '/@/router/types';

import { useI18n } from '/@/i18n/useI18n';
import { getParentLayout, LAYOUT } from '/@/router/constant';

const { t } = useI18n();
const charts: AppRouteModule = {
  path: '/charts',
  name: 'Charts',
  component: LAYOUT,
  redirect: '/charts/echarts/map',
  meta: { orderNo: 500, icon: 'ion:bar-chart-outline', title: t('routes.demo.charts.charts') },
  children: [
    {
      path: 'echarts',
      name: 'Echarts',
      component: getParentLayout('Echarts'),
      meta: { title: 'Echarts' },
      redirect: '/charts/echarts/map',
      children: [
        {
          path: 'map',
          name: 'Map',
          component: () => import('/@/views/demo/charts/echarts/Map.vue'),
          meta: { title: t('routes.demo.charts.map') },
        },
        {
          path: 'line',
          name: 'Line',
          component: () => import('/@/views/demo/charts/echarts/Line.vue'),
          meta: { title: t('routes.demo.charts.line') },
        },
      ],
    },
  ],
};

export default charts;
