declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
