const objProto = Object.prototype;
export function is(val: unknown, type: string) {
  return objProto.toString.call(val) === `[object ${type}]`;
}
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== "undefined";
};
export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";
