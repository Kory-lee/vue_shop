import { computed, unref } from 'vue';
import { getFullContent as fullContent } from '../web/useFullContent';
import { SIDE_BAR_MINI_WIDTH, SIDE_BAR_SHOW_TIT_MINI_WIDTH } from '/@/enums/configEnum';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnums';
import configStore from '/@/store/modules/config';
import { MenuSetting } from '/@/types/config';

export const getMenuSetting = computed(() => configStore.getProjectConfig.menuSetting);

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
export const getCanDrag = computed(() => unref(getMenuSetting).canDrag),
  getAccordion = computed(() => unref(getMenuSetting).accordion),
  getMixSideFixed = computed(() => unref(getMenuSetting).mixSideFixed);
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
      : unref(getMenuSetting);
  return unref(getCollapsed) ? unref(getMinWidthNumber) : unref(getMenuWidth);
});

export const getCalcContentWidth = computed(() => {
  const width =
    unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
      ? 0
      : unref(getIsMixSidebar)
      ? SIDE_BAR_SHOW_TIT_MINI_WIDTH
      : unref(getRealWidth);
  return `calc(100% - ${width}px)`;
});

export const getShowSidebar = computed(
  () =>
    unref(getSplit) ||
    (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && !unref(fullContent))
);

export function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
  configStore.commitProjectConfigState({ menuSetting });
}

export function toggleCollapsed() {
  setMenuSetting({ collapsed: !unref(getCollapsed) });
}
