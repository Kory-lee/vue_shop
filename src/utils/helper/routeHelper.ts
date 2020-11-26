import { toRaw } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { omit } from '../common';
import type {
  AppRouteModule,
  AppRouteRecordRaw,
  RouteModule
} from "/@/router/types";
export function genRouteModule(
  moduleList: AppRouteModule[] | AppRouteRecordRaw[]
) {
  const ret: AppRouteRecordRaw[] = [];
  for (const routeMod of moduleList) {
    let routes: RouteRecordRaw[] = [],
      layout: AppRouteRecordRaw | undefined;
    if (Reflect.has(routeMod, "routes")) {
      routes = (<RouteModule>routeMod).routes as any;
      layout = (<RouteModule>routeMod).layout;
    } else if (Reflect.has(routeMod, "path")) {
      layout = omit(routeMod, "children");
      routes =
        (routeMod.children as RouteRecordRaw[]) || ([] as RouteRecordRaw[]);
    }
    const router = createRouter({ routes, history: createWebHashHistory() });
    const flatList = (toRaw(router.getRoutes()).filter(
      (item) => item.children.length === 0
    ) as unknown) as AppRouteRecordRaw[];
    flatList.forEach(
      (item) => (item.path = `${layout ? layout.path : ""}${item.path}`)
    );
    if (layout) {
      layout.children = flatList;
      ret.push(layout);
    } else ret.push(...flatList);
  }
  return ret as RouteRecordRaw[];
}

