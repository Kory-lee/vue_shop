import { createStorage } from '../cache';
import { warn } from '../log';
import { BASE_LOCAL_CACHE_KEY, BASE_SESSION_CACHE_KEY } from '/@/enums/cacheEnum';

interface CacheStore {
  local: Record<string, any>;
  session: Record<string, any>;
}
const ls = createStorage(localStorage);
const ss = createStorage();
/**
 * @description: Persistent cache
 */
const cache: CacheStore = {
  local: {},
  session: {},
};

function initCache() {
  cache.local = ls.get(BASE_LOCAL_CACHE_KEY) || {};
  cache.session = ss.get(BASE_SESSION_CACHE_KEY) || {};
}
initCache();

export function setLocal(key: string, value: any, immediate: boolean = false) {
  const local = ls.get(BASE_LOCAL_CACHE_KEY)?.[BASE_LOCAL_CACHE_KEY] || [];
  cache.local[BASE_LOCAL_CACHE_KEY] = { ...local, ...cache.local[BASE_LOCAL_CACHE_KEY] } || {};
  cache.local[BASE_LOCAL_CACHE_KEY][key] = value;
  if (immediate) ls.set(BASE_LOCAL_CACHE_KEY, cache.local);
}

export function getLocal<T>(key: string): T | null {
  try {
    return cache.local[BASE_LOCAL_CACHE_KEY][key];
  } catch (e) {
    return null;
  }
}

export function removeLocal(key: string) {
  if (cache.local[BASE_LOCAL_CACHE_KEY])
    Reflect.deleteProperty(cache.local[BASE_LOCAL_CACHE_KEY], key);
  else warn('have`t local cache');
}

export function clearLocal(immediate = false) {
  cache.local = {};
  immediate && ls.remove(BASE_LOCAL_CACHE_KEY);
}

export function setSession(key: string, value: any, immediate = false) {
  const session = ss.get(BASE_SESSION_CACHE_KEY)?.[BASE_SESSION_CACHE_KEY] || {};
  // TODO
  cache.session[BASE_SESSION_CACHE_KEY] =
    { ...session, ...cache.session[BASE_SESSION_CACHE_KEY] } || {};
}
export function getSession<T>(key: string): T | null {
  try {
    return cache.session[BASE_SESSION_CACHE_KEY][key];
  } catch (error) {
    return null;
  }
}

export function clearSession(immediate = false) {
  cache.session = {};
  immediate && ss.remove(BASE_SESSION_CACHE_KEY);
}
