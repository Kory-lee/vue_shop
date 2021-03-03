import type { GlobalEnvConfig } from '/@/types/config';
import getFileName from '../../build/getConfigFileName';

export const getGlobalEnvConfig = (): GlobalEnvConfig => {
  const ENV_NAME = getFileName(import.meta.env);
  return ((isDevMode() ? import.meta.env : window[ENV_NAME]) as unknown) as GlobalEnvConfig;
};
export const devMode = 'development';

export const prodMode = 'production';

export const isUseMock = (): boolean => import.meta.env.VITE_USE_MOCK === 'true';

export const isDevMode = (): boolean => import.meta.env.DEV;

export const isProdMode = (): boolean => import.meta.env.PROD;
