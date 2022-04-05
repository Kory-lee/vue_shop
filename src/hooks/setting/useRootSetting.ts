import type { ProjectConfig } from '/@/types/config';

import { computed, unref } from 'vue';
import { ContentEnum } from '/@/enums/configEnum';
import router from '/@/router';
import useConfigStore, { useConfigStoreWidthOut } from '/@/store/modules/config';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;

export const getRootSetting = computed((): RootSetting => {
  const configStore = useConfigStoreWidthOut();
  return configStore.getProjectConfig;
});

export const getPageLoading = computed(() => {
  const configStore = useConfigStoreWidthOut();
  return configStore.getPageLoading;
});

export const getOpenKeepAlive = computed(() => unref(getRootSetting).openKeepAlive);

export const getCanEmbedIFramePage = computed(() => unref(getRootSetting).canEmbedIFramePage);

export const getPermissionMode = computed(() => unref(getRootSetting).permissionMode);

export const getShowLogo = computed(() => unref(getRootSetting).showLogo);

export const getContentMode = computed(() => unref(getRootSetting).contentMode);

export const getUseOpenBackTop = computed(() => getRootSetting.value.useOpenBackTop);

export const getShowSettingButton = computed(() => getRootSetting.value.showSettingButton);

export const getUseErrorHandle = computed(() => unref(getRootSetting).useErrorHandle);

export const getShowFooter = computed(() => unref(getRootSetting).showFooter);

export const getShowBreadCrumb = computed(() => getRootSetting.value.showBreadCrumb);

export const getShowBreadCrumbIcon = computed(() => getRootSetting.value.showBreadCrumbIcon);

export const getFullContent = computed(() => getRootSetting.value.fullContent);

export const getRealFullContent = computed(() => {
  const route = unref(router.currentRoute),
    query = route.query;
  if (query && Reflect.has(query, '__full__')) return true;
  return unref(getFullContent);
});

export const getColorWeak = computed(() => getRootSetting.value.colorWeak);

export const getGrayMode = computed(() => getRootSetting.value.grayMode);

export const getLockTime = computed(() => getRootSetting.value.lockTime);

export const getDarkMode = computed(() => {
  const configStore = useConfigStore();
  return configStore.getDarkMode;
});

export const getLayoutContentMode = computed(() =>
  getRootSetting.value.contentMode === ContentEnum.FULL ? ContentEnum.FULL : ContentEnum.FIXED
);

export function setRootSetting(setting: Partial<RootSetting>) {
  const configStore = useConfigStoreWidthOut();
  configStore.setProjectConfig(setting);
}

export function useRootSetting() {
  return {
    setRootSetting,
    getOpenKeepAlive,
    getPageLoading,
    getCanEmbedIFramePage,
    getPermissionMode,
    getShowLogo,
    getContentMode,
    getUseOpenBackTop,
    getShowSettingButton,
    getUseErrorHandle,
    getShowFooter,
    getShowBreadCrumb,
    getShowBreadCrumbIcon,
    getFullContent,
    getRealFullContent,
    getColorWeak,
    getGrayMode,
    getLockTime,
    getLayoutContentMode,
    getDarkMode,
  };
}
