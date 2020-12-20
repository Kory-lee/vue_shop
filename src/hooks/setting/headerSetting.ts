import { computed, unref } from 'vue';
import { getFullContent } from '../web/useFullContent';
import {
  getIsSideBarType,
  getIsTopMenu,
  getMenuMode,
  getShowHeaderTrigger,
  getSplit
} from './menuSetting';
import { getShowBreadCrumb, getShowLogo } from './RootSetting';
import { MenuModeEnum } from '/@/enums/menuEnums';
import configStore from '/@/store/modules/config';
import { HeaderSetting } from '/@/types/config';

export const getShowMixHeaderRef = computed<boolean>(
  () => !unref(getIsSideBarType) && unref(getShowHeader)
);

export const getShowFullHeaderRef = computed(
  () =>
    !unref(getFullContent) &&
    unref(getShowMixHeaderRef) &&
    unref(getShowHeader) &&
    !unref(getIsTopMenu)
);

export const getShowInsetHeaderRef = computed(() => {
  const need = !unref(getFullContent) && unref(getShowHeader);
  return (need && !unref(getShowMixHeaderRef)) || (need && unref(getIsTopMenu));
});

export const getHeaderSetting = computed(() => configStore.getProjectConfig.headerSetting);

export const getShowHeader = computed(() => unref(getHeaderSetting).show);
export const getShowDoc = computed(() => unref(getHeaderSetting).showDoc);

export const getHeaderTheme = computed(() => unref(getHeaderSetting).theme);

export const getFixed = computed(() => unref(getHeaderSetting).fixed);

export const getHeaderBgColor = computed(() => unref(getHeaderSetting).bgColor);
export const getShowSearch = computed(() => unref(getHeaderSetting).showSearch);
export const getUseLockPage = computed(() => unref(getHeaderSetting).useLockpage);
export const getShowFullScreen = computed(() => unref(getHeaderSetting).showFullScreen);
export const getShowNotice = computed(() => unref(getHeaderSetting).showNotice);
export const getUnFixedAndFull = computed(() => !unref(getFixed) && !unref(getShowFullHeaderRef));
export const getShowHeaderBreadCrumb = computed(
  () =>
    unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb) && !unref(getSplit)
);

export const getShowHeaderLogo = computed<boolean>(
  () => unref(getShowLogo) && !unref(getIsSideBarType)
);
export const getShowContent = computed(
  () => unref(getShowHeaderBreadCrumb) || unref(getShowHeaderTrigger)
);
export function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
  configStore.commitProjectConfigState({ headerSetting });
}
