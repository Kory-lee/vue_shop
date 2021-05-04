import { computed, ref, Ref, unref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useProviderContext } from '/@/components/Application';
import { getIsHorizontal, getSplit, setMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { MenuSplitTypeEnum } from '/@/enums/menuEnum';
import { getChildrenMenus, getCurrentParentPath, getMenus, getShallowMenus } from '/@/router/menus';
import { MenuType } from '/@/router/types';
import { usePermissionStore } from '/@/store/modules/permission';
import { useThrottleFn } from '@vueuse/core';

export function useSplitMenu(splitType: Ref<MenuSplitTypeEnum>) {
  const permissionStore = usePermissionStore();

  const menusRef = ref<MenuType[]>([]),
    { currentRoute } = useRouter(),
    { isMobile } = useProviderContext(),
    splitNotLeft = computed(
      () => unref(splitType) !== MenuSplitTypeEnum.LEFT && !unref(getIsHorizontal)
    ),
    getSplitLeft = computed(() => !unref(getSplit) || unref(splitType) !== MenuSplitTypeEnum.LEFT),
    getSplitTop = computed(() => unref(splitType) === MenuSplitTypeEnum.TOP),
    normalType = computed(() => unref(splitType) === MenuSplitTypeEnum.NONE || !unref(getSplit));

  const throttleHandleSplitLeftMenu = useThrottleFn(handleSplitLeftMenu, 50);

  watch(
    [() => unref(currentRoute).path, () => unref(splitType)],
    async ([path]: [string, MenuSplitTypeEnum]) => {
      if (unref(splitNotLeft) || unref(isMobile)) return;

      const { meta } = unref(currentRoute),
        currentActiveMenu = meta.currentActiveMenu as string;
      let parentPath = await getCurrentParentPath(path);
      if (!parentPath) parentPath = await getCurrentParentPath(currentActiveMenu);
      parentPath && (await throttleHandleSplitLeftMenu(parentPath));
    },
    { immediate: true }
  );

  watch(
    [() => permissionStore.getLastBuildMenuTime, () => permissionStore.getBackMenuList],
    () => {
      genMenus();
    },
    { immediate: true }
  );
  watch(getSplit, async () => {
    if (unref(splitNotLeft)) return;
    await genMenus();
  });

  async function handleSplitLeftMenu(parentPath: string) {
    if (unref(getSplitLeft) || unref(isMobile)) return;

    const children = await getChildrenMenus(parentPath);
    if (!children?.length) {
      setMenuSetting({ hidden: true });
      menusRef.value = [];
      return;
    }
    setMenuSetting({ hidden: false });
    menusRef.value = children;
  }

  async function genMenus() {
    if (unref(normalType.value || unref(isMobile))) {
      menusRef.value = await getMenus();
      return;
    }
    // split top
    if (unref(getSplitTop)) {
      menusRef.value = await getShallowMenus();
      return;
    }
  }

  return { menusRef };
}
