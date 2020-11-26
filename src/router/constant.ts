import { AppRouteRecordRaw } from "./types";

export const DEFAULT_LAYOUT_COMPONENT = () =>
  import("/@/layouts/default/index");
export const PAGE_LAYOUT_COMPONENT = () => import("/@/layouts/page/index");


export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: "/:path(.*)*",
  name: "ErrorPage",
  component: () => import('/@/views/sys/exception/index.vue'),
  meta: { title: "ErrorPage", hideBreadcrumb: true },
};
