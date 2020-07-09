import Vue from 'vue';
import VueRouter from 'vue-router';
import { getToken } from '@utils/cookie';
import store from '@store';
import { defaultRoutersMap } from './routers';

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
// 系统分配
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: defaultRoutersMap,
});
// 路由守卫
// 白名单
const whiteRouter = ['/login'];
const isLogin = getToken();

router.beforeEach((to, from, next) => {
  if (whiteRouter.includes(to.path)) {
    store.dispatch('login/exit');
    next();
  } else {
    if (isLogin)
      if (!store.getters['permission/roles']?.length)
        store.dispatch('permission/getUserRoles').then(({ role }) =>
          store.dispatch('permission/createRouter', role).then(() => {
            let addRouters = store.getters['permission/addRouters'];
            let allRouters = store.getters['permission/allRouters'];
            // 路由更新
            router.options.routes = allRouters;
            // 动态路由
            router.addRoutes(addRouters);
            // 不会留下history记录
            next({ ...to, replace: true });
          })
        );
      else next();
    else next('/login');
  }
});

export default router;
