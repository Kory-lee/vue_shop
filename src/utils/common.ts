import { isObject } from './is';

export function omit(obj: any, attr: string) {
  const { [attr]: _, ...newObj } = obj;
  return newObj;
}

export const noop = () => {};

export function deepMerge<T = any>(src: any, target: any): T {
  let key: string;
  for (key in target)
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  return src;
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }
) {
  const { target = '_blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];
  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');
  window.open(url, target, feature.join(','));
}
