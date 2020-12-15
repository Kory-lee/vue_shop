import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { asyncRoutes, basicRoutes } from './routes';

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

export default router;
