import { LAYOUT } from '/@/router/constant';
const dashboard = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/workbench',
  meta: { icon: 'ant-design:home-outlined', title: 'Dashboard' },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('/@/views/dashboard/workbench/index.vue'),
      meta: { title: '工作台', affix: true },
    },
  ],
};
export default dashboard;
