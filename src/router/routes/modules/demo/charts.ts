import { t } from '/@/plugins/i18n';
import { getParentLayout, LAYOUT } from '/@/router/constant';
import { AppRouteModule } from '/@/router/types';

const charts: AppRouteModule = {
  path: '/charts',
  name: 'Charts',
  component: LAYOUT,
  redirect: '/charts/apexChart',
  meta: { icon: 'ion:bar-chart-outline', title: t('routes.demo.charts.charts') },
  children: [
    {
      path: 'apexChart',
      name: 'ApexChart',
      meta: { title: t('routes.demo.charts.apexChart') },
      component: () => import('/@/views/demo/charts/apex/index.vue'),
    },
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
      ],
    },
  ],
};

export default charts;
