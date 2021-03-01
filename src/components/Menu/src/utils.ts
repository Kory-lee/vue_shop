import { compile, computed, Ref, toRaw, unref } from 'vue';
import { MenuState } from './types';
import { MenuModeEnum } from '/@/enums/menuEnums';
import { useTimeoutFn } from '/@/hooks/core/useTimeout';
import { getCollapsed, getIsMixMode, getIsMixSidebar } from '../../../hooks/setting/MenuSetting';
import { Menu } from '/@/router/types';
import { es6Unique } from '/@/utils/common';
import { getAllParentPath } from '/@/utils/helper/menuHelper';

export function useOpenKeys(
  menuState: MenuState,
  menus: Ref<Menu[]>,
  mode: Ref<MenuModeEnum>,
  accordion: Ref<boolean>
) {
  async function setOpenKeys(path: string) {
    if (mode.value === MenuModeEnum.HORIZONTAL) return;
    const native = unref(getIsMixSidebar);
    useTimeoutFn(
      () => {
        const menuList = toRaw(menus.value);
        if (menuList?.length === 0) {
          menuState.openKeys = [];
          return;
        }
        if (!unref(accordion))
          menuState.openKeys = es6Unique([
            ...menuState.openKeys,
            ...getAllParentPath(menuList, path),
          ]);
        else menuState.openKeys = getAllParentPath(menuList, path);
      },
      16,
      !native
    );
  }
  const getOpenKeys = computed(() => {
    const collapse = unref(getIsMixSidebar) ? false : unref(getCollapsed);
    return collapse ? menuState.collapsedOpenKeys : menuState.openKeys;
  });

  function resetKeys() {
    menuState.selectedKeys = [];
    menuState.openKeys = [];
  }

  function handleOpenChange(openKeys: string[]) {
    if (unref(mode) === MenuModeEnum.HORIZONTAL || !unref(accordion) || unref(getIsMixSidebar))
      menuState.openKeys = openKeys;
    else {
      const rootSubMenuKeys: string[] = [];
      for (const { children, path } of unref(menus)) {
        if (children && children?.length) rootSubMenuKeys.push(path);
      }
      if (!unref(getCollapsed)) {
        const latestOpenKey = openKeys.find((key) => menuState.openKeys.indexOf(key) === -1);
        if (rootSubMenuKeys.indexOf(latestOpenKey as string) === -1) menuState.openKeys = openKeys;
        else menuState.openKeys = latestOpenKey ? [latestOpenKey] : [];
      } else menuState.collapsedOpenKeys = openKeys;
    }
  }
  return { setOpenKeys, getOpenKeys, resetKeys, handleOpenChange };
}
