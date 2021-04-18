import { PageEnum } from "/@/enums/pageEnum";
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from "../constant";
import type { AppRouteModule, AppRouteRecordRaw } from "/@/router/types";
import { t } from "/@/i18n/useI18n";

const modules = import.meta.globEager("./modules/**/*.ts");
const routeModuleList: AppRouteModule[] = [];

// 浅复制
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod[key]) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageEnum.BASE_HOME,
  meta: { title: "Root" }
};

export const LoginRoute: AppRouteRecordRaw = {
  path: "/login",
  name: "Login",
  component: () => import("/@/views/sys/login/index.vue"),
  meta: { title: t("routes.basic.login") }
};

// 基础路由 不用权限
export const basicRoutes = [LoginRoute, RootRoute, REDIRECT_ROUTE];
