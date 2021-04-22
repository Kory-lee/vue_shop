import { computed, ref, Ref, unref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useProviderContext } from '/@/components/Application';
import { getIsHorizontal, getSplit } from '/@/hooks/setting/useMenuSetting';
import { MenuSplitTypeEnum } from '/@/enums/menuEnum';
import { useThrottle } from '/@/hooks/core/useThrottle';
import { getCurrentParentPath, getMenus, getShallowMenus } from '/@/router/menus';
import { MenuType } from '/@/router/types';
import { usePermissionStore } from '/@/store/modules/permission';

export default function useSplitMenu(splitType: Ref<MenuSplitTypeEnum>) {
  const permissionStore = usePermissionStore();
  const [throttleHandleSplitLeftMenu] = useThrottle(handleSplitLeftMenu, 50);

  const menusRef = ref<MenuType[]>([]),
    { currentRoute } = useRouter(),
    { isMobile } = useProviderContext(),
    splitNotLeft = computed(
      () => unref(splitType) !== MenuSplitTypeEnum.LEFT && !unref(getIsHorizontal)
    ),
    getSplitLeft = computed(() => !unref(getSplit) || unref(splitType) !== MenuSplitTypeEnum.LEFT),
    getSplitTop = computed(() => unref(splitType) === MenuSplitTypeEnum.TOP),
    normalType = computed(() => unref(splitType) === MenuSplitTypeEnum.NONE || !unref(getSplit));

  watch(
    [() => unref(currentRoute).path, () => unref(splitType)],
    async ([path]: [string, MenuSplitTypeEnum]) => {
      if (unref(splitNotLeft) || unref(isMobile)) return;
      const { meta } = unref(currentRoute),
        currentActiveMenu = meta.currentActiveMenu as string;
      let parentPath = await getCurrentParentPath(path);
      if (!parentPath) parentPath = await getCurrentParentPath(currentActiveMenu);
      parentPath && throttleHandleSplitLeftMenu(parentPath);
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
  watch([() => getSplit.value], () => {
    if (unref(splitNotLeft)) return;
    genMenus();
  });
  async function handleSplitLeftMenu(parentPath: string) {
    if (unref(getSplitLeft) || unref(isMobile)) return;
    // TODO split menu
  }
  async function genMenus() {
    if (unref(normalType.value || unref(isMobile))) {
      menusRef.value = await getMenus();
      return;
    }
    // split top
    if (unref(getSplitTop)) {
      const shallowMenus = await getShallowMenus();
      menusRef.value = shallowMenus;
      return;
    }
  }
  return { menusRef };
}
