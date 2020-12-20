import { createStorage } from '../cache';
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
  cache.local[BASE_LOCAL_CACHE_KEY] = { ...local, ...(cache.local[BASE_LOCAL_CACHE_KEY] || {}) };
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
