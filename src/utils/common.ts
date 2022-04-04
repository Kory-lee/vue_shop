import { isObject } from './is';

export const noop = () => {};

export function deepMerge<T = any>(src: any, target: any): T {
  for (const key in target) {
    if (target.hasOwnProperty(key))
      src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];
  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');
  window.open(url, target, feature.join(','));
}
