import { toRaw } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import type { AppRouteModule, AppRouteRecordRaw } from "../router/types";

export function getRouteModule(moduleList: AppRouteModule[]) {
  const ret: AppRouteRecordRaw[] = [];
  for (const routeMod of moduleList) {
    const routes = routeMod.routes as any;
    const layout = routeMod.layout;
    const router = createRouter({ routes, history: createWebHashHistory() });
    const flatList = toRaw(router.getRoutes()).filter(
      (item) => item.children?.length === 0
    );
    // try {
    //   (router as any) = null;
    // } catch (error) {}
    flatList.forEach((item) => (item.path = `${layout.path}${item.path}`));
    layout.children = (flatList as unknown) as AppRouteRecordRaw[];
    ret.push(layout);
  }
  return ret as RouteRecordRaw[];
}
