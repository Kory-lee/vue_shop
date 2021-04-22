import { PROJ_CFG_KEY } from '../enums/cacheEnum';
import { ProjectConfig } from '../types/config';
import { deepMerge } from '../utils/common';
import projectSetting from '/@/settings/projectSetting';
import { useConfigStore } from '/@/store/modules/config';
import { Persistent } from '/@/utils/cache/persistent';
import { ThemeEnum } from '/@/enums/configEnum';
import { updateDarkTheme } from '/@/logics/theme/dark';
import { getCommonStoragePrefix, getStorageShortName } from '/@/utils/env';
import { updateGrayMode } from '/@/logics/theme/updateGrayMode';
import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground';
import { useLocaleStore } from '/@/store/modules/locale';
import { primaryColor } from '../../build/config/themeConfig';
import { changeTheme } from '/@/logics/theme';

export function initConfigStore() {
  const localeStore = useLocaleStore(),
    configStore = useConfigStore();

  let config: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig;
  config = deepMerge(projectSetting, config || {});
  const darkMode = configStore.getDarkMode;
  const {
    colorWeak,
    grayMode,
    themeColor,
    headerSetting: { bgColor: headerBgColor } = {},
    menuSetting: { bgColor } = {},
  } = config;
  try {
    if (themeColor && themeColor !== primaryColor) changeTheme(themeColor);
    grayMode && updateGrayMode(grayMode);
    // colorWeak && updateColorW
  } catch (e) {
    console.log(e);
  }
  configStore.setProjectConfig(config);

  updateDarkTheme(darkMode);
  if (darkMode === ThemeEnum.DARK) {
    updateHeaderBgColor();
    updateSidebarBgColor();
  } else {
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
  }
  localeStore.initLocale();

  setTimeout(() => clearObsoleteStorage(), 16);
}

// as the version continues to iterate, there will be more and more cache keys stored in localeStorage
// this method is used to deleted useless keys
export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix(),
    shortPrefix = getStorageShortName();

  [localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) item.removeItem(key);
    });
  });
}
