import {
  AppRouteModule,
  AppRouteRecordRaw,
  RouteModule
} from "/@/router/types";

export function genRouteModule(
  moduleList: AppRouteModule[] | AppRouteRecordRaw[]
) {
  const ret: AppRouteRecordRaw[] = [];
  for (const routeMod of moduleList) {
    let routes = [],
      layout;
    if (Reflect.has(routeMod, "routes")) {
      routes = (routeMod as RouteModule).routes;
      layout = (routeMod as RouteModule).layout;
    } else if (Reflect.has(routeMod, "path")) {
    }
  }
}
