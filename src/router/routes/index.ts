import modules from "globby!/@/router/routes/modules/**/*.@(ts)";
import { DEFAULT_LAYOUT_COMPONENT } from "../constant";
import type { AppRouteModule, AppRouteRecordRaw } from "/@/router/types";

const routeModuleList: AppRouteModule[] = [];
Object.keys(modules).forEach((key) => routeModuleList.push(modules[key]));
console.log(routeModuleList);

export const asyncRouts = [
  
];
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
