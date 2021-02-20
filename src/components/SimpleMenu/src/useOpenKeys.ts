import { computed, Ref, toRaw, unref } from 'vue';
import { SimpleMenuState } from './types';
import { useTimeoutFn } from '/@/hooks/core/useTimeout';
import { Menu } from '/@/router/types';
import { es6Unique } from '/@/utils/common';
import { getAllParentPath } from '/@/utils/helper/menuHelper';

export default function useOpenKeys(
  menuState: SimpleMenuState,
  menus: Ref<Menu[]>,
  accordion: Ref<boolean>,
  mixSidebar: Ref<boolean>,
  collapse: Ref<boolean>
) {
  async function setOpenKeys(path: string) {
    const native = !mixSidebar.value;
    useTimeoutFn(
      () => {
        const menuList = toRaw(menus.value);
        if (menuList?.length === 0) {
          menuState.activeSubMenuNames = [];
          menuState.openNames = [];
          return;
        }
        const keys = getAllParentPath(menuList, path);
        if (!unref(accordion)) menuState.openNames = es6Unique([...menuState.openNames, ...keys]);
        else menuState.openNames = keys;
        menuState.activeSubMenuNames = menuState.openNames;
      },
      16,
      native
    );
  }
  const getOpenKeys = computed(() => (unref(collapse) ? [] : menuState.openNames));
  return { setOpenKeys, getOpenKeys };
}
