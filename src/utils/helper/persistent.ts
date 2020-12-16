interface CacheStore {
  local: Record<string, any>;
  session: Record<string, any>;
}

/**
 * @description: Persistent cache
 */
const cache: CacheStore = {
  local: {},
  session: {},
};
