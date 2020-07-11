import Layout from '@views/Layout';

export const defaultRoutersMap = [
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
    hidden: true,
    meta: {
      name: '404',
    },
    component: () => import('@views/error-page/404'),
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
        path: 'index',
        name: 'Index',
        meta: {
          name: '首页',
        },
        component: () => import('@views/Console'),
      },
    ],
  },
  {
    path: '/error',
    component: Layout,
    // redirect: 'noRedirect',
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
];

export const asyncRoutersMap = [
  {
    path: '/info',
    name: 'Info',
    meta: {
      roles: ['sale', 'manager'],
      system: 'infoSystem',
      name: '信息管理',
      icon: 'info',
    },
    component: Layout,
    children: [
      {
        path: '/infoIndex',
        name: 'InfoIndex',
        meta: {
          keepAlive: true,
          roles: ['sale', 'manager'],
          name: '信息列表',
        },
        component: () => import('@views/Info'),
      },
      {
        path: '/infoCategory',
        name: 'InfoCategory',
        meta: {
          keepAlive: true,
          role: ['sale'],
          name: '信息分类',
        },
        component: () => import('@views/Info/Category'),
      },
      {
        path: '/infoDetail',
        name: 'InfoDetail',
        hidden: true,
        meta: {
          keepAlive: true,
          role: ['sale'],
          name: '信息详情',
        },
        component: () => import('@views/Info/Detail'),
      },
    ],
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      system: 'userSystem',
      roles: ['sale'],
      name: '用户管理',
      icon: 'user',
    },
    component: Layout,
    children: [
      {
        path: '/userIndex',
        name: 'UserIndex',
        meta: {
          keepAlive: true,
          role: ['sale'],
          name: '用户列表',
        },
        component: () => import('@views/User'),
      },
    ],
  },
  { path: '*', redirect: '/404', name: 'error', hidden: true },
];
