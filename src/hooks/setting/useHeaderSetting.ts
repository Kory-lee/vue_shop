import { computed, unref } from 'vue';
import {
  getIsMixSidebar,
  getIsSidebarType,
  getIsTopMenu,
  getMenuMode,
  getShowHeaderTrigger,
  getSplit,
} from './useMenuSetting';
import { getRealFullContent, getShowBreadCrumb, getShowLogo } from './useRootSetting';
import { MenuModeEnum } from '/@/enums/menuEnum';
import { HeaderSetting } from '/@/types/config';
import { useConfigStoreWidthOut } from '/@/store/modules/config';

const configStore = useConfigStoreWidthOut();
export const getShowMixHeaderRef = computed<boolean>(
  () => !unref(getIsSidebarType) && unref(getShowHeader)
);
export const getShowFullHeaderRef = computed(
  () =>
    !unref(getRealFullContent) &&
    unref(getShowMixHeaderRef) &&
    unref(getShowHeader) &&
    !unref(getIsTopMenu) &&
    !unref(getIsMixSidebar)
);

export const getShowInsetHeaderRef = computed(() => {
  const need = !unref(getRealFullContent) && unref(getShowHeader);
  return (need && !unref(getShowMixHeaderRef)) || (need && unref(getIsTopMenu));
});

export const getHeaderSetting = computed(() => configStore.getProjectConfig.headerSetting);

export const getShowHeader = computed(() => unref(getHeaderSetting).show);

export const getShowDoc = computed(() => unref(getHeaderSetting).showDoc);

export const getHeaderTheme = computed(() => unref(getHeaderSetting).theme);

export const getFixed = computed(() => unref(getHeaderSetting).fixed);

export const getHeaderBgColor = computed(() => unref(getHeaderSetting).bgColor);

export const getShowSearch = computed(() => unref(getHeaderSetting).showSearch);

export const getUseLockPage = computed(() => unref(getHeaderSetting).useLockPage);

export const getShowFullScreen = computed(() => unref(getHeaderSetting).showFullScreen);

export const getShowNotice = computed(() => unref(getHeaderSetting).showNotice);

export const getUnFixedAndFull = computed(() => !unref(getFixed) && !unref(getShowFullHeaderRef));

export const getShowHeaderBreadCrumb = computed(
  () =>
    unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb) && !unref(getSplit)
);

export const getShowHeaderLogo = computed<boolean>(
  () => unref(getShowLogo) && !unref(getIsSidebarType)
);

export const getShowContent = computed(
  () => unref(getShowHeaderBreadCrumb) || unref(getShowHeaderTrigger)
);

export function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
  configStore.setProjectConfig({ headerSetting });
}
