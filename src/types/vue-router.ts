import { RoleEnum } from '../enums/roleEnum';

export {};

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number;
    title: string;
    dynamicLevel?: number;
    realPath?: string;
    ignoreAuth?: boolean;
    roles: RoleEnum[];
    igonreKeepAlive?: boolean;
    affix?: boolean;
    icon?: string;
    frameSrc?: string;
    transitionName?: string;
    hideBreadcrumb?: boolean;
    hideChildrenInMenu?: boolean;
    carrayParam?: boolean;
    single?: boolean;
    currentActiveMenu?: string;
    hideTab?: boolean;
    hideMenu?: boolean;
    isLink?: boolean;
    ignoreRoute?: boolean;
    hidePathForChildreen?: boolean;
  }
}
