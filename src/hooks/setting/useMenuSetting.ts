import { computed, ref, unref } from 'vue';
import { getRealFullContent } from './useRootSetting';
import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '/@/enums/configEnum';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum';
import { MenuSetting } from '/@/types/config';
import { useConfigStoreWidthOut } from '/@/store/modules/config';

const mixSideHasChildren = ref(false);

export const getMenuSetting = computed(() => {
  const configStore = useConfigStoreWidthOut();
  return configStore.getProjectConfig.menuSetting;
});

export const getCollapsed = computed(() => unref(getMenuSetting).collapsed);

export const getMenuType = computed(() => unref(getMenuSetting).type);

export const getMenuMode = computed(() => unref(getMenuSetting).mode);

export const getMenuFixed = computed(() => unref(getMenuSetting).fixed);

export const getShowMenu = computed(() => unref(getMenuSetting).show);

export const getMenuHidden = computed(() => unref(getMenuSetting).hidden);

export const getMenuWidth = computed(() => unref(getMenuSetting).menuWidth);

export const getTrigger = computed(() => unref(getMenuSetting).trigger);

export const getMenuTheme = computed(() => unref(getMenuSetting).theme);

export const getSplit = computed(() => unref(getMenuSetting).split);

export const getMenuBgColor = computed(() => unref(getMenuSetting).bgColor);

export const getCanDrag = computed(() => unref(getMenuSetting).canDrag);

export const getAccordion = computed(() => unref(getMenuSetting).accordion);

export const getMixSideFixed = computed(() => unref(getMenuSetting).mixSideFixed);
export const getCloseMixSidebarOnchange = computed(
  () => unref(getMenuSetting).closeMixSidebarOnChange
);
export const getCollapsedShowTitle = computed(() => unref(getMenuSetting).collapsedShowTitle);

export const getTopMenuAlign = computed(() => unref(getMenuSetting).topMenuAlign);

export const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.SIDEBAR);

export const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.TOP_MENU);

export const getShowTopMenu = computed(
  () => unref(getMenuMode) === MenuModeEnum.HORIZONTAL || unref(getSplit)
);
export const getShowHeaderTrigger = computed(() => {
  if (unref(getMenuType) === MenuTypeEnum.TOP_MENU || !unref(getShowMenu) || unref(getMenuHidden))
    return false;
  else return unref(getTrigger) === TriggerEnum.HEADER;
});

export const getIsHorizontal = computed(() => unref(getMenuMode) === MenuModeEnum.HORIZONTAL);

export const getIsMixSidebar = computed(() => unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR);

export const getIsMixMode = computed(
  () => unref(getMenuMode) === MenuModeEnum.INLINE && unref(getMenuType) === MenuTypeEnum.MIX
);
export const getMinWidthNumber = computed(() =>
  unref(getCollapsedShowTitle) ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH
);

export const getRealWidth = computed(() => {
  if (unref(getIsMixSidebar))
    return unref(getCollapsed) && !unref(getMixSideFixed)
      ? unref(getMinWidthNumber)
      : unref(getMenuWidth);
  return unref(getCollapsed) ? unref(getMinWidthNumber) : unref(getMenuWidth);
});

export const getCalcContentWidth = computed(() => {
  const width =
    unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
      ? 0
      : unref(getIsMixSidebar)
      ? unref(getCollapsed)
        ? SIDE_BAR_MINI_WIDTH
        : SIDE_BAR_SHOW_TIT_MINI_WIDTH +
          (unref(getMixSideFixed) && unref(mixSideHasChildren) ? unref(getRealWidth) : 0)
      : unref(getRealWidth);

  return `calc(100% - ${width}px)`;
});

export const getShowSidebar = computed(
  () =>
    unref(getSplit) ||
    (unref(getShowMenu) &&
      unref(getMenuMode) !== MenuModeEnum.HORIZONTAL &&
      !unref(getRealFullContent))
);

export function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
  const configStore = useConfigStoreWidthOut();

  configStore.setProjectConfig({ menuSetting });
}

export function toggleCollapsed() {
  setMenuSetting({ collapsed: !unref(getCollapsed) });
}
