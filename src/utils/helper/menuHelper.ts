import { cloneDeep } from 'lodash';
import { isUrl } from '../is';
import { findPath, forEach } from './treeHelper';
import { AppRouteModule, AppRouteRecordRaw, MenuModule, MenuType } from '/@/router/types';

export function getAllParentPath(treeData: any[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as MenuType[];
  return (menuList || []).map((item) => item.path);
}

function joinParentPath(list: any, node: any) {
  let allPaths = getAllParentPath(list, node.path);
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.
    // TODO
  allPaths = allPaths.slice(0, allPaths.length - 1);
}

/**
 * @description 解析菜单模块
 * @param menuModule
 */
export function transformMenuModule(menuModule: MenuModule): MenuType {
  const { menu } = menuModule,
    menuList = [menu];
  forEach(menuList, (m) => {
    !isUrl(m.path) && joinParentPath(menuList, m);
  });
  return menuList[0];
}

export function transformRouteToMenu(routeModList: AppRouteModule[]) {
  const cloneRouteModList = cloneDeep(routeModList),
    routeList: AppRouteRecordRaw[] = [];
  cloneRouteModList.forEach((item) => {
    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });
}
