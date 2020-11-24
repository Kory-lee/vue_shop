import { DEFAULT_LAYOUT_COMPONENT } from "../constant";
import type { AppRouteModule, AppRouteRecordRaw } from "../types";
import dashboard from "./modules/dashboard";
import { getRouteModule } from "/@/utils/routeHelper";

const routeModuleList: AppRouteModule[] = [dashboard];
// Object.keys(modules).forEach((key) => routeModuleList.push(modules[key]));

/*
TODO 在store进行权限分配 动态引入
*/
export const asyncRoutes = [...getRouteModule(routeModuleList)];

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  component: DEFAULT_LAYOUT_COMPONENT,
  redirect: "/dashboard",
  meta: { title: "Root" },
  children: [
    {
      path: "dashboard",
      name: "Dashboard",
      component: () => import("/@/views/dashboard/index"),
      meta: { title: "首页", icon: "home-4-line" },
    },
  ],
};
export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("/@/views/login/index.vue"),
  meta: { title: "登录" },
};
export const basicRoutes = [RootRoute, LoginRoute];
