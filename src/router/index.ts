import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { REDIRECT_NAME } from './constant';
import { createGuard } from './guard';
import { asyncRoutes, basicRoutes } from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes: ([...basicRoutes, ...asyncRoutes] as unknown) as RouteRecordRaw[],
  strict: true,
});

export function resetRouter() {
  const resetWhiteNameList = ['login', REDIRECT_NAME];
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && resetWhiteNameList.includes(<string>name))
      router.hasRoute(name) && router.removeRoute(name);
  });
}

export default {
  ...router,
  install(app: App<Element>) {
    router.install(app);
    createGuard(router);
  },
};
