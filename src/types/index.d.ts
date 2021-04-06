declare interface Fn<T = any, R = T> {
  (...args: T[]): R;
}
declare interface PromiseFn<T = any, R = T> {
  (...args: T[]): Promise<R>;
}

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

declare type TargetContext = '_self' | '_blank';
