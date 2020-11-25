import {
  createRouter,
  createWebHashHistory,

  RouteRecordRaw
} from "vue-router";
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
    let routes: RouteRecordRaw[] = [],
      layout;
    if (Reflect.has(routeMod, "routes")) {
      routes = (<RouteModule>routeMod).routes as any;
      layout = (<RouteModule>routeMod).layout;
    } else if (Reflect.has(routeMod, "path")) {
      layout = omit(routeMod, "children");
      routes =
        (routeMod.children as RouteRecordRaw[]) || ([] as RouteRecordRaw[]);
    }
    const router = createRouter({ routes, history: createWebHashHistory() });
    console.log(routes);
    console.log(router.getRoutes());
  }
}
function omit(obj: { [propertyName: string]: any }, attr: string) {
  const { [attr]: _, ...newObj } = obj;
  return newObj;
}
