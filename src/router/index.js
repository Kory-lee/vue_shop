import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@views/Layout';
import { getToken } from '@utils/cookie';

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hiddden: true,
  //   children: [{ path: 'redirect/:path(.*)', component: () => import('@views/redirect') }],
  // },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      name: '登录',
    },
    component: () => import('@views/Login'),
  },
  {
    path: '/404',
    component: () => import('@views/error-page/404'),
    hidden: true,
    meta: {
      name: '404',
    },
  },
  {
    path: '/',
    name: 'Console',
    redirect: 'index',
    meta: {
      name: '控制台',
      icon: 'console',
    },
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'Index',
        // redirect: '/',
        meta: {
          name: '首页',
        },
        component: () => import('@views/Console'),
      },
    ],
  },
  {
    path: '/info',
    name: 'Info',
    meta: {
      name: '信息管理',
      icon: 'info',
    },
    component: Layout,
    children: [
      {
        path: '/infoIndex',
        name: 'InfoIndex',
        meta: {
          name: '信息列表',
        },
        component: () => import('@views/Info'),
      },
      {
        path: '/infoCategory',
        name: 'InfoCategory',
        meta: {
          name: '信息分类',
        },
        component: () => import('@views/Info/Category'),
      },
    ],
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      name: '用户管理',
      icon: 'user',
    },
    component: Layout,
    children: [
      {
        path: '/userIndex',
        name: 'UserIndex',
        meta: {
          name: '用户列表',
        },
        component: () => import('@views/User'),
      },
    ],
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    hidden: true,
    name: 'ErrorPages',
    meta: {
      name: 'Error Pages',
      icon: '404',
    },
    children: [
      {
        path: '401',
        component: () => import('@views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true },
      },
      {
        path: '404',
        component: () => import('@views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true },
      },
    ],
  },
  { path: '*', redirect: '/404', hidden: true },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
// 路由守卫
// 白名单
const whiteRouter = ['/login'];
const isLogin = getToken();

router.beforeEach((to, from, next) => {
  if (whiteRouter.includes(to.name)) next();
  else isLogin ? next() : next('/login');
});

export default router;
