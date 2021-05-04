import type { AppRouteModule } from '/@/router/types';
import { getParentLayout, LAYOUT } from '/@/router/constant';
import { useI18n } from '/@/i18n/useI18n';

const { t } = useI18n();
const comp: AppRouteModule = {
  path: '/comp',
  name: 'Comp',
  component: LAYOUT,
  meta: { icon: 'ion:layers-outline', title: t('routes.demo.comp.comp') },
  children: [
    {
      path: 'basic',
      name: 'BasicDemo',
      component: () => import('/@/views/demo/comp/button/index.vue'),
      meta: { title: t('routes.demo.comp.basic') },
    },
    {
      path: 'form',
      name: 'FormDemo',
      redirect: '/comp/form/basic',
      component: getParentLayout('FormDemo'),
      meta: { title: t('routes.demo.form.form') },
      children: [
        {
          path: 'basic',
          name: 'FormBasicDemo',
          component: () => import('/@/views/demo/comp/form/index.vue'),
          meta: {
            title: t('routes.demo.form.basic'),
          },
        },
      ],
    },
  ],
};

export default comp;
