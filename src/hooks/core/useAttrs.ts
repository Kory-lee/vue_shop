import { Ref } from 'vue';
import { getCurrentInstance, watchEffect, shallowRef, reactive } from 'vue-demi';

interface Params {
  excludeListeners?: boolean;
  excludeKeys?: string[];
}

const DEFAULT_EXCLUDE_KEYS = ['class', 'style'];
const LISTENER_PREFIX = /^on[A-Z]/;

function entries<T>(obj: Recordable<T>): [string, T][] {
  return Object.keys(obj).map((key: string) => [key, obj[key]]);
}

export function useAttrs(params: Params = {}): Ref<Recordable> | {} {
  const instance = getCurrentInstance();
  if (!instance) return {};
  const { excludeListeners = false, excludeKeys = [] } = params;
  const attrs = shallowRef({});
  const allExcludeKeys = excludeKeys.concat(DEFAULT_EXCLUDE_KEYS);

  // Since attrs are not reactive, make it reactive instead of doing in `onUpdated` hook for better performance
  // TODO
  instance.attrs = reactive(instance.attrs);

  watchEffect(() => {
    attrs.value = entries(instance.attrs).reduce((acm, [key, val]) => {
      if (!allExcludeKeys.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key)))
        acm[key] = val;
      return acm;
    }, {});
  });
  return attrs;
}
