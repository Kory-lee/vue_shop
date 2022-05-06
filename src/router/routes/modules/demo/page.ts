import { useI18n } from '/@/i18n/useI18n';
import { getParentLayout, LAYOUT } from '/@/router/constant';
import { AppRouteModule } from '/@/router/types';

const { t } = useI18n();
const page: AppRouteModule = {
  path: '/page-demo',
  name: 'PageDemo',
  component: LAYOUT,
  redirect: '/page-demo/account',
  meta: { orderNo: 20, icon: 'ion:aperture-outline', title: t('routes.demo.page.page') },
  children: [
    {
      path: 'account',
      name: 'AccountPage',
      component: getParentLayout('AccountPage'),
      redirect: '/page-demo/account/setting',
      meta: {
        title: t('routes.demo.page.account'),
      },
      children: [
        {
          path: 'center',
          name: 'AccountCenterPage',
          meta: {
            title: t('routes.demo.page.accountCenter'),
          },
          component: () => import('/@/views/demo/page/account/center/index.vue'),
        },
      ],
    },
  ],
};
export default page;
