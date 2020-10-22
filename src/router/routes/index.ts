import type { AppRouteModule, AppRouteRecordRaw } from "../types";
import { DEFAULT_LAYOUT_COMPONENT } from "../constant";
// import modules from "globby!/@/router/routes/modules/**/*.@(ts)";

// const routeModuleList: AppRouteModule[] = [];
// Object.keys(modules).forEach((key) => routeModuleList.push(modules[key]));

export const RootRoute: AppRouteRecordRaw = {
  path: "/",
  name: "Root",
  component: DEFAULT_LAYOUT_COMPONENT,
  redirect: "/dashboard",
  meta: { title: "Root" },
  children: [],
};

export const basicRoutes = [RootRoute];
