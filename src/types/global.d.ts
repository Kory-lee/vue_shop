declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

declare type Nullable<T> = T | null;

declare type Indexable<T extends any = any> = {
  [key: string]: T;
};

declare type Recordable<T extends any = any> = Record<string, T>;
declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

declare type TimeoutHandle = ReturnType<typeof setTimeout>;

declare type TargetContext = '_self' | '_blank';
