import projectSetting from '/@/settings/projectSetting';
import { CacheTypeEnum, TOKEN_KEY } from '/@/enums/cacheEnum';
import { BasicKeys, Persistent } from '/@/utils/cache/persistent';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;
export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}
