import type { FunctionalComponent } from 'vue';
import { computed, ref, unref } from 'vue';
import type { RouteLocation } from 'vue-router';
import { useRouter } from 'vue-router';
import { getOpenKeepAlive } from '/@/hooks/setting/RootSetting';
import tabStore, { PAGE_LAYOUT_KEY } from '/@/store/modules/tab';
import { tryTsxEmit } from '/@/utils/helper/vueHelper';

const ParentLayoutName = 'ParentLayout';

export function getKey(component: FunctionalComponent & { type: Indexable }, route: RouteLocation) {
  return !!component?.type.parentView ? {} : { key: route.fullPath };
}
export function useCache(isPage: boolean) {
  const name = ref('');
  const { currentRoute } = useRouter();

  tryTsxEmit((instance) => {
    const routeName = instance.type.name;
    if (routeName && ![ParentLayoutName].includes(routeName)) name.value = routeName;
    else {
      const matched = currentRoute.value?.matched;
      if (!matched) return;
      const len = matched.length;
      if (len < 2) return;
      name.value = matched[len - 2].name as string;
    }
  });
  const getCaches = computed((): string[] => {
    if (!unref(getOpenKeepAlive)) return [];

    const cached = tabStore.getCachedMapState;
    if (isPage) return cached.get(PAGE_LAYOUT_KEY) || [];
    const cacheSet = new Set<string>();
    cacheSet.add(unref(name));

    const list = cached.get(name.value);
    if (!list) return Array.from(cacheSet);

    list.forEach((item) => cacheSet.add(item));
    return Array.from(cacheSet);
  });
  return { getCaches };
}
