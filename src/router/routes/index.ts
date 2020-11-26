import modules from "globby!/@/router/routes/modules/**/*.@(ts)";
import { DEFAULT_LAYOUT_COMPONENT, PAGE_NOT_FOUND_ROUTE } from "../constant";
import type { AppRouteModule, AppRouteRecordRaw } from "/@/router/types";
import { genRouteModule } from "/@/utils/helper/routeHelper";

const routeModuleList: AppRouteModule[] = [];
Object.keys(modules).forEach((key) => routeModuleList.push(modules[key]));

export const asyncRoutes = [
  PAGE_NOT_FOUND_ROUTE,
  ...genRouteModule(routeModuleList),
];
console.log(asyncRoutes);

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  component: DEFAULT_LAYOUT_COMPONENT,
  redirect: "/dashboard",
  meta: {
    title: "Root",
  },
  children: [
    {
      name: "Dashboard",
      path: "dashboard",
      meta: { title: "控制台" },
      component: () => import("/@/views/dashboard/index.vue"),
    },
  ],
};

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("/@/views/sys/login/Login.vue"),
  meta: {
    title: "登录",
  },
};

// 基础路由 不用权限
export const basicRoutes = [LoginRoute, RootRoute];
