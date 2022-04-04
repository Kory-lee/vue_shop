import { isFunction } from 'lodash-es';
import { YYYY_MM_DD_HH_MM_SS } from '../date';
import { isObject, isString } from '../is';

export function createNow<T extends boolean>(
  join: boolean,
  restful: T
): T extends true ? string : Record<string, unknown>;

export function createNow(join: boolean, restful = false) {
  if (!join) return restful ? '' : {};
  const now = new Date().getTime();
  if (restful) return `?_t=${now}`;
  return { _t: now };
}

/**
 * @description 格式化请求参数时间
 * @param params
 */
export function formatRequestDate(params: any) {
  if (!isObject(params)) return;
  for (const key in params) {
    const format = params[key]?.format;
    if (isFunction(format)) {
      params[key] = params[key].format(YYYY_MM_DD_HH_MM_SS);
    }

    if (isString(key)) {
      const value = params[key];
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value;
        } catch (e: any) {
          throw new Error(e);
        }
      }
    }
    if (isObject(params[key])) formatRequestDate(params[key]);
  }
}

export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}
