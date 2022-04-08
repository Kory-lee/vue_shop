import type { App } from 'vue';

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { REDIRECT_NAME } from './constant';
import { createGuard } from './guard';
import { basicRoutes, LoginRoute } from './routes';

const WHITE_NAME_LIST = [LoginRoute.name, REDIRECT_NAME];

const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
});

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(<string>name))
      router.hasRoute(name) && router.removeRoute(name);
  });
}

export function setupRouter(app: App<Element>) {
  app.use(router);
  createGuard(router);
}

export default router;
