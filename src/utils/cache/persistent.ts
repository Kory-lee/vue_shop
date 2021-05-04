import { toRaw } from '@vue/reactivity';
import { createLocalStorage, createSessionStorage } from '.';
import Memory from './Memory';
import {
  APP_LOCAL_CACHE_KEY,
  APP_SESSION_CACHE_KEY,
  LOCK_INFO_KEY,
  MULTIPLE_TABS_KEY,
  PROJ_CFG_KEY,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
} from '/@/enums/cacheEnum';
import { DEFAULT_CACHE_TIME } from '/@/settings/encryptionSetting';
import { LockInfo } from '/@/store/modules/config';
import { ProjectConfig } from '/@/types/config';
import { UserInfo } from '/@/types/store';
import { RouteLocationNormalized } from 'vue-router';

interface BasicCache {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [ROLES_KEY]: string[];
  [LOCK_INFO_KEY]: LockInfo;
  [PROJ_CFG_KEY]: ProjectConfig;
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[];
}

type LocalCache = BasicCache;
type SessionCache = BasicCache;
export type BasicKeys = keyof BasicCache;
type LocalKeys = keyof LocalCache;
type SessionKeys = keyof SessionCache;

const ls = createLocalStorage(),
  ss = createSessionStorage();

const localMemory = new Memory(DEFAULT_CACHE_TIME),
  sessionMemory = new Memory(DEFAULT_CACHE_TIME);

export class Persistent {
  constructor() {}
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as Nullable<T>;
  }
  static setLocal(key: LocalKeys, val: LocalCache[LocalKeys], immediate = false) {
    localMemory.set(key, toRaw(val));
    immediate && ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  }
  static removeLocal(key: LocalKeys) {
    localMemory.remove(key);
  }

  static clearLocal() {
    localMemory.clear();
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as Nullable<T>;
  }
  static setSession(key: SessionKeys, value: SessionCache[SessionKeys], immediate = false) {
    sessionMemory.set(key, toRaw(value));
    immediate && ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
  }
  static removeSession(key: SessionKeys) {
    sessionMemory.remove(key);
  }
  static clearSession() {
    sessionMemory.clear();
  }
  static clearAll() {
    sessionMemory.clear();
    localMemory.clear();
  }
}

function initPersistentMemory() {
  const localCache = ls.get(APP_LOCAL_CACHE_KEY),
    sessionCache = ss.get(APP_SESSION_CACHE_KEY);
  localCache && localMemory.restCache(localCache);
  sessionCache && sessionMemory.restCache(sessionCache);
}
function storageChange(e: any) {
  const { key, newValue, oldValue } = e;
  if (!key) {
    Persistent.clearAll();
    return;
  }

  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) Persistent.clearLocal();
    else if (APP_SESSION_CACHE_KEY === key) Persistent.clearSession();
  }
}
window.addEventListener('beforeunload', function () {
  ls.set(APP_LOCAL_CACHE_KEY, localMemory.getCache);
  ss.set(APP_SESSION_CACHE_KEY, sessionMemory.getCache);
});
window.addEventListener('storage', storageChange);

initPersistentMemory();
