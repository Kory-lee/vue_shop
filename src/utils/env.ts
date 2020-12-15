import type { GlobalEnvConfig } from '/@/types/config';
export const getGlobalEnvConfig = (): GlobalEnvConfig => {
  const env = import.meta.env;
  return env;
};
export const devMode = 'development';

export const prodMode = 'production';

export const isUseMock = (): boolean => import.meta.env.VITE_USE_MOCK === 'true';

export const isDevMode = (): boolean => import.meta.env.DEV;
