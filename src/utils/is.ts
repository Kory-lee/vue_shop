import { isUndefined } from 'lodash';

const toString = Object.prototype.toString;

export const is = (val: unknown, type: string) => toString.call(val) === `[object ${type}]`;

export const isDef = <T = unknown>(val?: T): val is T => typeof val !== 'undefined';
export const isUnDef = <T = unknown>(val?: T): val is T => !isDef(val);

export const isString = (val: unknown): val is string => is(val, 'String');
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && is(val, 'Object');
export const isFunction = (val: unknown): val is Fn => typeof val === 'function';
export const isDate = (val: unknown): val is Date => is(val, 'Date');
export const isNull = (val: unknown): val is null => val === null;
export const isNullOrUnDef = (val: unknown): val is null | undefined =>
  isUndefined(val) || isNull(val);

export const isNumber = (val: unknown): val is number => is(val, 'Number');
export const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
export const isBoolean = (val: unknown): val is boolean => is(val, 'Boolean');
export const isRegExp = (val: unknown): val is RegExp => is(val, 'RegExp');
export const isArray = (val: any): val is Array<any> => val && Array.isArray(val);
export const isWindow = (val: any): val is Window =>
  typeof window !== 'undefined' && is(val, 'Window');
export const isElement = (val: unknown): val is Element => isObject(val) && !!val.tagName;
export const isImageDom = (o: Element) => o && ['IMAGE', 'IMG'].includes(o.tagName);
export const isTextarea = (el: Element | null): el is HTMLTextAreaElement =>
  el !== null && el.tagName.toLocaleLowerCase() === 'textarea';

export const isMobile = (): boolean =>
  !!navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOs|Symbian|Windows Phone)/i
  );
export const isUrl = (path: string): boolean => {
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
};
