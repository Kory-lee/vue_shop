import { Router, RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '../constant';
import { RouteMeta } from '../types';
import { PageEnum } from '/@/enums/pageEnum';
import { permissionStore, userStore } from '/@/store/modules';

const LOGIN_PATH = PageEnum.BASE_LOGIN;
const whitePathList: PageEnum[] = [LOGIN_PATH];

export default function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (from.path === LOGIN_PATH && to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next(PageEnum.BASE_HOME);
      return;
    }

    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }
    const token = userStore.getTokenState;

    if (!token) {
      if (((to.meta as unknown) as RouteMeta).ignoreAuth) {
        next();
        return;
      }
      const redirectDate: { path: string; replace: boolean; query?: Indexable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };

      if (to.path) {
        redirectDate.query = {
          ...redirectDate.query,
          redirect: to.path,
        };
      }
      next(redirectDate);
      console.log(redirectDate);
      return;
    }
    if (permissionStore.getIsDynamicAddedRouteState) {
      next();
      return;
    }
    const routes = await permissionStore.buildRoutesAction();

    routes.forEach((route) => router.addRoute((route as unknown) as RouteRecordRaw));
    console.log('routes', routes);
    const redirectPath = (from.query.redirect || to.path) as string,
      redirect = decodeURIComponent(redirectPath),
      nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
    permissionStore.commitDynamicAddedRouteState(true);
    next(nextData);
  });
}
