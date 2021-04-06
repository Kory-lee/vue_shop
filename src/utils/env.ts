import type { GlobalEnvConfig } from '/@/types/config';
import getFileName from '../../build/getConfigFileName';
import pkg from '../../package.json';
import { warn } from './log';

export function getCommonStoragePrefix() {
  const { VITE_GLOBAL_APP_SHORT_NAME } = getGlobalEnvConfig();
  return `${VITE_GLOBAL_APP_SHORT_NAME}__${getEnv()}`.toUpperCase();
}

export function getStorageShortName() {
  return `${getCommonStoragePrefix()}__${pkg.version}__`.toUpperCase();
}

export const getGlobalEnvConfig = (): GlobalEnvConfig => {
  const ENV_NAME = getFileName(import.meta.env);
  const ENV = import.meta.env.DEV ? import.meta.env : window[ENV_NAME];

  const {
    VITE_GLOBAL_APP_TITLE,
    VITE_GLOBAL_API_URL,
    VITE_GLOBAL_APP_SHORT_NAME,
    VITE_GLOBAL_API_PREFIX_URL,
    VITE_GLOBAL_UPLOAD_URL,
  } = ENV;

  if (!/[a-zA-Z\_]*/.test(VITE_GLOBAL_APP_SHORT_NAME)) {
    warn(
      `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
    );
  }
  return {
    VITE_GLOBAL_APP_TITLE,
    VITE_GLOBAL_API_URL,
    VITE_GLOBAL_APP_SHORT_NAME,
    VITE_GLOBAL_API_PREFIX_URL,
    VITE_GLOBAL_UPLOAD_URL,
  };
};

export const devMode = 'development';

export const prodMode = 'production';

export function getEnv(): string {
  return import.meta.env.MODE;
}

export const isUseMock = (): boolean => import.meta.env.VITE_USE_MOCK === 'true';

export const isDevMode = (): boolean => import.meta.env.DEV;

export const isProdMode = (): boolean => import.meta.env.PROD;
