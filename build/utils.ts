import dotenv from 'dotenv';
export interface ViteEnv {
  VITE_PORT: number;
  VITE_USE_MOCK: boolean;
  VITE_USE_PWA: boolean;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY: [string, string][];
  VITE_GLOBAL_APP_TITLE: string;
  VITE_USE_CDN: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_BUILD_GZIP: boolean;
  VITE_DYNAMIC_IMPORT: boolean;
}

export function loadEnv(): ViteEnv {
  const env = process.env.NODE_ENV;
  const ret: any = {};
  const envList = [`.env.${env}`, `.env.${env}.local`, `.env`, `.env.local`];
  envList.forEach((i) => dotenv.config({ path: i }));
  for (const envName of Object.keys(process.env)) {
    let realName: any = process.env[envName]?.replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;
    if (envName === 'VITE_PORT') realName = Number(realName);
    else if (envName === 'VITE_PROXY')
      try {
        realName = JSON.parse(realName);
      } catch (e) {}
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}
