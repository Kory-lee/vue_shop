import type { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { asyncRoutes, basicRoutes } from './routes';
console.log(asyncRoutes)
const router = createRouter({
  history: createWebHashHistory(),
  routes: [...basicRoutes, ...asyncRoutes] as RouteRecordRaw[],
  strict: true,
});

export function resetRouter() {
  const resetWhiteNameList = ['login'];
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && resetWhiteNameList.includes(<string>name))
      router.hasRoute(name) && router.removeRoute(name);
  });
}

export default {
  install(app: App<Element>) {
    app.use(router);
    // createGuard(router)
  },
};
