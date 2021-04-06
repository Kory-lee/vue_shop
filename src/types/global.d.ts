import type { App } from '@vue/runtime-core';

declare global {
  const _APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };
  declare interface Window {
    __APP__: App<Element>;
  }
  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;

  declare type Recordable<T extends any = any> = Record<string, T>;
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };

  declare type Indexable<T extends any = any> = {
    [key: string]: T;
  };

  declare type TimeoutHandle = ReturnType<typeof setTimeout>;

  declare interface ViteEnv {
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
}
