import cloneDeep from 'lodash/cloneDeep';
import { isArray, isUrl } from '../is';
import { findPath, treeMap } from './treeHelper';
import type { AppRouteModule, AppRouteRecordRaw, MenuModule, MenuType } from '/@/router/types';

export function getAllParentPath(treeData: any[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as MenuType[];
  return (menuList || []).map((item) => item.path);
}

function joinParentPath(menus: MenuType[] | MenuType, parentPath = '') {
  const menuList = isArray(menus) ? menus : [menus];
  for (const menu of menuList) {
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.
    if (!menu.path.startsWith('/') || isUrl(menu.path)) menu.path = `${parentPath}/${menu.path}`;
    // path doesn't start with /, nor is it a url, join parent path
    if (menu?.children?.length) joinParentPath(menu.children, menu.path);
  }
}

/**
 * @description 解析菜单模块
 * @param menuModule
 */
export function transformMenuModule(menuModule: MenuModule): MenuType {
  const { menu } = menuModule;
  joinParentPath(menu);
  return menu;
}

export function transformRouteToMenu(routeModList: AppRouteModule[], routerMapping = false) {
  const cloneRouteModList = cloneDeep(routeModList),
    routeList: AppRouteRecordRaw[] = [];
  cloneRouteModList.forEach((item) => {
    if (routerMapping && item.meta.hideChildrenInMenu && typeof item.redirect === 'string') {
      item.path = item.redirect;
    }
    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });
  const list = treeMap(routeList, {
    conversion(node: AppRouteRecordRaw) {
      const { meta: { title, hideMenu = false } = {} } = node;
      return { ...(node.meta || {}), meta: node.meta, name: title, hideMenu, path: node.path };
    },
  });
  joinParentPath(list);
  return list;
}
