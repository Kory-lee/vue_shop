import type { Router, RouteRecordRaw } from 'vue-router';

import { PageEnum } from '/@/enums/pageEnum';
import { useUserStoreWithout } from '/@/store/modules/user';
import { usePermissionStoreWidthOut } from '/@/store/modules/permission';
import { PAGE_NOT_FOUND_ROUTE } from '../routes/basic';

const LOGIN_PATH = PageEnum.BASE_LOGIN;
const whitePathList: PageEnum[] = [LOGIN_PATH];

export default function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithout(),
    permissionStore = usePermissionStoreWidthOut();
  router.beforeEach(async (to, from, next) => {
    if (from.path === LOGIN_PATH && to.name === PAGE_NOT_FOUND_ROUTE.name) {
      next(PageEnum.BASE_HOME);
      return;
    }

    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }
    const token = userStore.getToken;

    if (!token) {
      if (to.meta.ignoreAuth) {
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
      return;
    }
    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }
    const routes = await permissionStore.buildRoutesAction();

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });

    const redirectPath = (from.query.redirect || to.path) as string,
      redirect = decodeURIComponent(redirectPath),
      nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };

    permissionStore.setDynamicAddedRoute(true);
    next(nextData);
  });
}
