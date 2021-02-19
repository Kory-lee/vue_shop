import type { RouteRecordRaw } from 'vue-router';
import { RoleEnum } from '/@/enums/roleEnum';
export interface RouteMeta {
  // title
  title: string;
  // Whether to ignore permissions
  ignoreAuth?: boolean;
  // role info
  roles?: RoleEnum[];
  // Whether not to cache
  ignoreKeepAlive?: boolean;
  // Is it fixed on tab
  affix?: boolean;
  // icon on tab
  icon?: string;
  // Jump address
  frameSrc?: string;
  // Outer link jump address
  externalLink?: string;

  // current page transition
  transitionName?: string;

  // Whether the route has been dynamically added
  hideBreadcrumb?: boolean;
  // Use internally to mark single-level menus
  single?: boolean;

  currentActiveMenu?: string;
  hidTab?: boolean;
  hideMenu?: boolean;

  // Carrying parameters
  carryParam?: boolean;
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: any;
  components?: any;
  children?: AppRouteRecordRaw[];
  props?: any;
  fullPath?: string;
}
export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success';
  content?: string;
  dot?: boolean;
}

export interface Menu {
  name: string;
  icon?: string;
  path: string;
  disabled?: boolean;
  children?: Menu[];

  orderNo?: number;
  roles?: RoleEnum[];

  meta?: Partial<RouteMeta>;
  tag?: MenuTag;
  hideMenu?: boolean;
}

export interface MenuModule {
  orderNo?: number;
  menu: Menu;
}

interface RouteModule {
  layout: AppRouteRecordRaw;
  routes: AppRouteRecordRaw[];
  children?: AppRouteRecordRaw[];
  component?: any;
}

export type AppRouteModule = RouteModule | AppRouteRecordRaw;
