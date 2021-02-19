import { unref } from 'vue';
import { Menu, MenuModule } from '../types';
import { PermissionModeEnum } from '/@/enums/configEnum';
import { getPermissionMode } from '/@/hooks/setting/RootSetting';

const modules = import.meta.globEager('./modules/**/*.ts');
const menuModules: MenuModule[] = [];
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {},
    modList = Array.isArray(mod) ? [...mod] : [mod];
  menuModules.push(...modList);
});
const isBackMode = () => unref(getPermissionMode) === PermissionModeEnum.BACK;

const staticMenus: Menu[] = [];
(() => {
  menuModules.sort((a, b) => (a.orderNo || 0) - (b.orderNo || 0));
  for (const menu of menuModules) {
    console.log(menu);
    // staticMenus.push(trans);
  }
})();

export async function getCurrentParentPath(currentPath: string) {
  // const menus = await get;
}
