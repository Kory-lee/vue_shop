import { pathToRegexp } from 'path-to-regexp';
import { RouteRecordNormalized } from 'vue-router';
import router from '..';
import { MenuModule, MenuType } from '../types';
import { PermissionModeEnum } from '../../enums/configEnum';
import { configStore, permissionStore } from '/@/store/modules';
import { getAllParentPath, transformMenuModule } from '/@/utils/helper/menuHelper';
import { filter } from '/@/utils/helper/treeHelper';
import { isUrl } from '/@/utils/is';

const modules = import.meta.globEager('./modules/**/*.ts');
const menuModules: MenuModule[] = [];
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {},
    modList = Array.isArray(mod) ? [...mod] : [mod];
  menuModules.push(...modList);
});

const staticMenus = (() => {
  const menus: MenuType[] = [];
  menuModules.sort((a, b) => (a.orderNo || 0) - (b.orderNo || 0));
  for (const menu of menuModules) {
    menus.push(transformMenuModule(menu));
  }
  return menus;
})();

const isBackMode = () => configStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK;

/**
 * @description 前端角色控制菜单 直接读取菜单文件
 */
async function getAsyncMenus() {
  return !isBackMode() ? staticMenus : permissionStore.getBackMenuListState;
}
/**
 * @description 获取树级菜单
 */
export const getMenus = async (): Promise<MenuType[]> => {
  const menus = await getAsyncMenus(),
    routes = router.getRoutes();
  return !isBackMode() ? filter(menus, basicFilter(routes)) : menus;
};

/**
 * @description 获取当前路径的顶级路径
 * */
export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus(),
    allParentPath = await getAllParentPath(menus, currentPath);
  return allParentPath?.[0];
}
/**
 * @description 获取一级菜单,删除children
 */
export async function getShallowMenus(): Promise<MenuType[]> {
  const menus = await getAsyncMenus(),
    routes = router.getRoutes(),
    shallowMenuList = menus.map((item) => ({ ...item, children: undefined }));
  return !isBackMode() ? shallowMenuList.filter(basicFilter(routes)) : shallowMenuList;
}

function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu: MenuType) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true;
      if (route.meta?.carryParam) return pathToRegexp(route.path).test(menu.path);

      const isSame = route.path === menu.path;
      if (!isSame) return false;

      if (route.meta?.ignoreAuth) return true;
      return isSame;
    });
    if (!matchRoute) return false;
    menu.icon = (menu.icon || matchRoute.meta.icon) as string;
    menu.meta = matchRoute.meta;
    return true;
  };
}
