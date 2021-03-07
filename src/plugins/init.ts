import { PROJ_CFG_KEY } from '../enums/cacheEnum';
import { ProjectConfig } from '../types/config';
import { deepMerge } from '../utils/common';
import { getLocal } from '../utils/cache/persistent';
import { updateHeaderBgColor, updateSidebarBgColor } from './theme';
import projectSetting from '/@/settings/projectSetting';
import configStore from '/@/store/modules/config';
export function initConfigStore() {
  let config: ProjectConfig = getLocal(PROJ_CFG_KEY) as ProjectConfig;
  config = deepMerge(projectSetting, config || {});
  try {
    const {
      colorWeak,
      grayMode,
      headerSetting: { bgColor: headerBgColor },
      menuSetting: { bgColor },
    } = config;
    headerBgColor && updateHeaderBgColor(headerBgColor);
    bgColor && updateSidebarBgColor(bgColor);
  } catch (e) {
    console.log(e);
  }
  configStore.commitProjectConfigState(config);
}
