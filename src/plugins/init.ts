import { PROJ_CFG_KEY } from '../enums/cacheEnum';
import { ProjectConfig } from '../types/config';
import { deepMerge } from '../utils/common';
import { getLocal } from '../utils/helper/persistent';
import projectSetting from '/@/settings/projectSetting';

export function initConfigStore() {
  let config: ProjectConfig = getLocal(PROJ_CFG_KEY) as ProjectConfig;
  config = deepMerge(projectSetting, config || {});
  try{
    const {colorWeak,grayMode,headerSetting:{bgColor:headerBgColor},menuSetting: {bgColor}}=config
    // headerBgColor &&

  }catch(e){}
}
