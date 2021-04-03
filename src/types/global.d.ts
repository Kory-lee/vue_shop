import type { App } from '@vue/runtime-core';

declare global {
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
}
