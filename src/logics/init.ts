import type { ProjectConfig } from '../types/config';

import { primaryColor } from '../../build/config/themeConfig';
import { PROJ_CFG_KEY } from '../enums/cacheEnum';
import { deepMerge } from '../utils/common';
import { updateColorWeak } from './theme/updateColorWeak';
import { ThemeEnum } from '/@/enums/configEnum';
import { changeTheme } from '/@/logics/theme';
import { updateDarkTheme } from '/@/logics/theme/dark';
import { updateHeaderBgColor, updateSidebarBgColor } from '/@/logics/theme/updateBackground';
import { updateGrayMode } from '/@/logics/theme/updateGrayMode';
import projectSetting from '/@/settings/projectSetting';
import { useConfigStore } from '/@/store/modules/config';
import { useLocaleStore } from '/@/store/modules/locale';
import { Persistent } from '/@/utils/cache/persistent';
import { getCommonStoragePrefix, getStorageShortName } from '/@/utils/env';

export async function initConfigStore() {
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
    if (themeColor && themeColor !== primaryColor) await changeTheme(themeColor);

    grayMode && updateGrayMode(grayMode);
    colorWeak && updateColorWeak(colorWeak);
  } catch (e) {
    console.log(e);
  }
  configStore.setProjectConfig(config);

  await updateDarkTheme(darkMode);
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
