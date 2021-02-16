import { computed, ref, Ref, unref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useProviderContext } from '/@/components/Application/Provider/useAppContext';
import { MenuSplitTypeEnum } from '/@/enums/menuEnums';
import { useThrottle } from '/@/hooks/core/useThrottle';
import { getIsHorizontal, getSplit } from '/@/hooks/setting/menuSetting';
import { Menu } from '/@/router/types';

// import
export function useSplitMenu(splitType: Ref<MenuSplitTypeEnum>) {
  const menuRef = ref<Menu[]>([]),
    { currentRoute } = useRouter(),
    { isMobile } = useProviderContext(),
    // [throttleHandleSplitLeftMenu] = useThrottle(handleSp),
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
        currentActiveMenu = meta.currentActiveMenu;
      // let parentPath = await getCurrentParentPath(path);
    }
  );

  async function handleSplitLeftMenu(parentPath: string) {
    // if(unref(getSpl))
  }
}
