import { uniq } from 'lodash';
import { computed, Ref, toRaw, unref } from 'vue';
import { SimpleMenuState } from './types';
import { useTimeoutFn } from '/@/hooks/core/useTimeout';
import { MenuType } from '/@/router/types';
import { getAllParentPath } from '/@/utils/helper/menuHelper';

export default function useOpenKeys(
  menuState: SimpleMenuState,
  menus: Ref<MenuType[]>,
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
        if (!unref(accordion)) menuState.openNames = uniq([...menuState.openNames, ...keys]);
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
