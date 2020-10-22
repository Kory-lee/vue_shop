import type { RouteRecordRaw } from "vue-router";
import { RoleEnum } from "/@/enums/role";
export interface RouteMeta {
  title: string;
  ignoreAuth?: boolean;
  roles?: RoleEnum[];
  ignoreKeepAlive?: boolean;
  affix?: boolean;
  icon?: string;
  frameSrc?: boolean;
  externalLink?: string;
  transitionName?: string;
  hideBreadcrumb?: boolean;
  disableRedirect?: boolean;
  afterCloseLoading?: boolean;
  inTab?: boolean;
  carryParam?: boolean;
}
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, "meta"> {
  meta: RouteMeta;
  component?: any;
  components?: any;
  children?: AppRouteRecordRaw[];
  props?: any;
  fullPath?: string;
}
export interface Menu {
  name: string;
  icon?: string;
  path?: string;
  disabled?: boolean;
  children?: Menu[];
  orderNo?: number;
  roles?: RoleEnum[];
  meta?: partial<RouteMeta>;
}
export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}
export interface AppRouteModule {
  layout: AppRouteRecordRaw;
  routes: AppRouteRecordRaw[];
}
