import type { AppRouteModule } from '/@/router/types';
import { getParentLayout, LAYOUT } from '/@/router/constant';
import { useI18n } from '/@/i18n/useI18n';

const { t } = useI18n();
const comp: AppRouteModule = {
  path: '/comp',
  name: 'Comp',
  component: LAYOUT,
  meta: { orderNo: 30, icon: 'ion:layers-outline', title: t('routes.demo.comp.comp') },
  children: [
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
    {
      path: 'editor',
      name: 'EditorDemo',
      redirect: '/comp/editor/tinymce',
      component: getParentLayout('EditorDemo'),
      meta: {
        title: t('routes.demo.editor.editor'),
      },
      children: [
        {
          path: 'tinymce',
          component: getParentLayout('TinymceDemo'),
          name: 'TinymceDemo',
          meta: {
            title: t('routes.demo.editor.tinymce'),
          },
          redirect: '/comp/editor/tinymce/index',
          children: [
            {
              path: 'index',
              name: 'TinymceBasicDemo',
              component: () => import('/@/views/demo/editor/tinymce/index.vue'),
              meta: {
                title: t('routes.demo.editor.tinymceBasic'),
              },
            },
          ],
        },
      ],
    },
  ],
};

export default comp;
