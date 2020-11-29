import { RouteRecordRaw } from "vue-router";
import { DEFAULT_LAYOUT_COMPONENT } from "../constant";

export const RootRoute: RouteRecordRaw = {
  path: "/",
  name: "Root",
  component: DEFAULT_LAYOUT_COMPONENT,
  redirect: "dashboard",
  meta: { title: "Root" },
  children: [
    {
      path: "dashboard",
      name: "Dashboard",
      component: () => import("/@/views/dashboard/index.vue"),
    },
  ],
};

const ButtonRoute = {
  path: "/button",
  name: "ButtonDemo",
  component: () => import("/@/views/button/index.vue"),
  meta: { title: "ButtonDemo" },
};
const ComponentRoutes = {
  path: "/components",
  redirect: "noRedirect",
  name: "Components",
  component: DEFAULT_LAYOUT_COMPONENT,
  children: [ButtonRoute],
};
export const LoginRoute = {
  path: "/login",
  name: "Login",
  component: () => import("/@/views/sys/login/Login.vue"),
  meta: { title: "登录" },
};
export const basicRoutes = [RootRoute, ComponentRoutes];
