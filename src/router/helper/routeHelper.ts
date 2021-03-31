import { cloneDeep } from 'lodash';
import { createRouter, createWebHashHistory, Router, RouteRecordNormalized } from 'vue-router';
import type { AppRouteModule, AppRouteRecordRaw } from '../types';

export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules = cloneDeep(routeModules);
  for (const module of modules) {
    if (!isMultipleRoute(module)) continue;

    promoteRouteLevel(module);
  }
  return modules;
}

// Routeing level upgrade
function promoteRouteLevel(routeModule: AppRouteModule) {
  // User vue-router to splice menus
  let router: Router | null = createRouter({
    routes: [(routeModule as unknown) as RouteRecordNormalized],
    history: createWebHashHistory(),
  });

  const routes = router.getRoutes();
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  routeModule.children = routeModule.children?.filter((item) => !item.children?.length);
}
// Add all sub-routes to the secondary route
function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteModule
) {
  for (const child of children) {
    const route = routes.find((item) => item.name === child.name);
    if (!route) continue;
    routeModule.children = routeModule.children || [];

    if (!routeModule.children.find((item) => item.name === route.name))
      routeModule.children?.push((route as unknown) as AppRouteModule);

    if (child.children?.length) addToChildren(routes, child.children, routeModule);
  }
}

// Determine whether the level exceeds 2 levels
function isMultipleRoute(routeModule: AppRouteModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length)
    return false;
  const children = routeModule.children;

  let flag = false;
  for (const child of children) {
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}
