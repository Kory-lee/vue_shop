import type { GlobalEnvConfig } from '/@/types/config';
import getFileName from '../../build/getConfigFileName';
import { useGlobalSetting } from '../hooks/setting';
import pkg from '../../package.json';

export function getStorageShortName() {
  const globalSetting = useGlobalSetting();
  return `${globalSetting.shortName}__${pkg.version}`.toUpperCase();
}

export const getGlobalEnvConfig = (): GlobalEnvConfig => {
  const ENV_NAME = getFileName(import.meta.env);
  return ((isDevMode() ? import.meta.env : window[ENV_NAME]) as unknown) as GlobalEnvConfig;
};

export const devMode = 'development';

export const prodMode = 'production';
export function getEnv(): string {
  return import.meta.env.MODE;
}
export const isUseMock = (): boolean => import.meta.env.VITE_USE_MOCK === 'true';

export const isDevMode = (): boolean => import.meta.env.DEV;

export const isProdMode = (): boolean => import.meta.env.PROD;
