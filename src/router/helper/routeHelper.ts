import cloneDeep from 'lodash/cloneDeep';
import type { AppRouteModule, AppRouteRecordRaw } from '../types';
import type { Component } from '../types';

import { createRouter, createWebHashHistory, Router, RouteRecordNormalized } from 'vue-router';
import { getParentLayout, LAYOUT } from '/@/router/constant';
import { warn } from '/@/utils/log';

const IFRAME = () => import('/@/views/sys/iframe/FrameBlank.vue');
export type LayoutMapKey = 'LAYOUT';
const LayoutMap = new Map<string, Component>();

LayoutMap.set('LAYOUT', LAYOUT);
LayoutMap.set('IFRAME', IFRAME);

let dynamicViewsModes: Record<string, () => Promise<Recordable>>;

function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  dynamicViewsModes = dynamicViewsModes || import.meta.glob('../../views/**/*.{vue,tsx}');
  if (!routes) return;
  routes.forEach((item) => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME';
    }
    const { component, name } = item;
    const { children } = item;
    if (component) {
      const layoutFound = LayoutMap.get(component as string);
      item.component = layoutFound
        ? layoutFound
        : dynamicImport(dynamicViewsModes, component as string);
    } else if (name) {
      item.component = getParentLayout();
    }
    children && asyncImportRoute(children);
  });
}
function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string
) {
  const keys = Object.keys(dynamicViewsModules);
  const matchKeys = keys.filter((key) => {
    let k = key.replace('../../views', '');
    const lastIndex = k.lastIndexOf('.');
    k = k.substring(0, lastIndex);
    return k === component;
  });
  if (matchKeys?.length === 1) return dynamicViewsModules[matchKeys[0]];
  if (matchKeys?.length > 1)
    warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure'
    );
}
export function transformObjToRoute<T>(routeList: AppRouteModule[]): T[] {
  routeList.forEach((route) => {
    const component = route.component as string;
    if (component) {
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = LayoutMap.get(component.toUpperCase() as LayoutMapKey);
      } else {
        route.children = [cloneDeep(route)];
        route.component = LAYOUT;
        route.name = `${route.name}Parent`;
        route.path = '';
        const meta = route.meta || {};
        meta.single = true;
        meta.affix = false;
        route.meta = meta;
      }
    }
    route.children && asyncImportRoute(route.children);
  });
  return routeList as unknown as T[];
}

export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules);
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
    routes: [routeModule as unknown as RouteRecordNormalized],
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
      routeModule.children?.push(route as unknown as AppRouteModule);

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
