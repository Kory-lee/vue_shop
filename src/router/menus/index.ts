import { pathToRegexp } from 'path-to-regexp';
import { RouteRecordNormalized } from 'vue-router';
import router from '..';
import { MenuModule, MenuType } from '../types';
import { PermissionModeEnum } from '/@/enums/configEnum';
import { getAllParentPath, transformMenuModule } from '/@/utils/helper/menuHelper';
import { filter } from '/@/utils/helper/treeHelper';
import { isUrl } from '/@/utils/is';
import { useConfigStoreWidthOut } from '/@/store/modules/config';
import { usePermissionStore } from '/@/store/modules/permission';

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

const getPermissionMode = () => {
  const configStore = useConfigStoreWidthOut();
  return configStore.getProjectConfig.permissionMode;
};

/**
 * @description 前端角色控制菜单 直接读取菜单文件
 */
async function getAsyncMenus() {
  const permissionStore = usePermissionStore();
  const mode = getPermissionMode();
  switch (mode) {
    case PermissionModeEnum.BACK:
      return permissionStore.getBackMenuList;
    case PermissionModeEnum.ROUTE_MAPPING:
      return permissionStore.getFrontMenuList.filter((item) => !item.hideMenu);
    case PermissionModeEnum.ROLE:
      return staticMenus;
  }
}
/**
 * @description 获取树级菜单
 */
export const getMenus = async (): Promise<MenuType[]> => {
  const menus = await getAsyncMenus();
  if (getPermissionMode() === PermissionModeEnum.ROLE) {
    const routes = router.getRoutes();
    return filter(menus, basicFilter(routes));
  }
  return menus;
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
    shallowMenuList = menus.map((item) => ({ ...item, children: undefined }));

  if (getPermissionMode() === PermissionModeEnum.ROLE) {
    const routes = router.getRoutes();
    return shallowMenuList.filter(basicFilter(routes));
  }
  return shallowMenuList;
}

/**@description: 获取菜单的children */
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus(),
    parent = menus.find((item) => item.path === parentPath);
  if (!parent?.children || !!parent?.meta?.hideChildrenInMenu) return [] as MenuType[];

  if (getPermissionMode() === PermissionModeEnum.ROLE) {
    const routes = router.getRoutes();
    return filter(parent.children, basicFilter(routes));
  }
  return parent.children;
}

function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu: MenuType) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true;
      if (route.meta?.carryParam) return pathToRegexp(route.path).test(menu.path);

      const isSame = route.path === menu.path;
      if (!isSame) return false;

      if (route.meta?.ignoreAuth) return true;
      return isSame || pathToRegexp(route.path).test(menu.path);
    });
    if (!matchRoute) return false;
    menu.icon = (menu.icon || matchRoute.meta.icon) as string;
    menu.meta = matchRoute.meta;
    return true;
  };
}
