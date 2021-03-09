import { t } from '/@/plugins/i18n';
import { LAYOUT } from '/@/router/constant';
import { AppRouteModule } from '/@/router/types';

export default {
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
      component: () => {},
    },
    {
      path: 'echarts',
      name: 'Echarts',
      component: () => {},
      meta: { title: 'Echarts' },
      redirect: '/charts/echarts/map',
      children: [
        {
          path: 'map',
          name: 'Map',
          component: () => {},
          meta: { title: t('routes.demo.charts.map') },
        },
      ],
    },
  ],
} as AppRouteModule;
