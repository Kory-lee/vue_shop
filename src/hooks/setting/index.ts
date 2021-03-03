import getProjectSetting from '/@/settings/projectSetting';
import { GlobalConfig, ProjectConfig } from '/@/types/config';
import { getGlobalEnvConfig } from '/@/utils/env';
import { warn } from '/@/utils/log';

export const useGlobalSetting = (): Readonly<GlobalConfig> => {
  const {
    VITE_GLOBAL_APP_TITLE,
    VITE_GLOBAL_API_URL,
    VITE_GLOBAL_APP_SHORT_NAME,
    VITE_GLOBAL_API_PREFIX_URL,
    VITE_GLOBAL_UPLOAD_URL,
  } = getGlobalEnvConfig();

  if (!/[a-zA-Z\_]*/.test(VITE_GLOBAL_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
    );
  }

  return {
    title: VITE_GLOBAL_APP_TITLE,
    apiUrl: VITE_GLOBAL_API_URL,
    shortName: VITE_GLOBAL_APP_SHORT_NAME,
    prefixUrl: VITE_GLOBAL_API_PREFIX_URL,
    uploadUrl: VITE_GLOBAL_UPLOAD_URL,
  };
};

export const useProjectSetting = (): ProjectConfig => {
  // TODO computed
  return getProjectSetting;
};
