export interface ViteEnv {
  VITE_PORT: number;
  VITE_USE_MOCK: boolean;
  VITE_USE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY: [string, string][];
  VITE_GLOBAL_APP_TITLE: string;
  VITE_GLOBAL_APP_SHORT_NAME: string;
  VITE_USE_CDN: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_BUILD_GZIP: boolean;
  VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  VITE_DYNAMIC_IMPORT: boolean;
  VITE_LEGACY: boolean;
  VITE_USE_IMAGEMIN: boolean;
}

export function wrapperEnv(envConfig: any): ViteEnv {
  const ret: any = [];
  for (const envName of Object.keys(envConfig)) {
    let realName = envConfig[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (envName === 'VITE_PORT') realName = Number(realName);
    else if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName);
      } catch (e) {}
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}
