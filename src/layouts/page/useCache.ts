import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useRootSetting from '/@/hooks/setting/RootSetting';
import tabStore, { PAGE_LAYOUT_KEY } from '/@/store/modules/tab';
import { tryTsxEmit } from '/@/utils/helper/vueHelper';

const ParentLayoutName = 'parentLayout';
export default function useCache(isPage: boolean) {
  const name = ref('');
  const { currentRoute } = useRouter();
  tryTsxEmit((instance) => {
    const routeName = instance.type.name;
    if (routeName && ![ParentLayoutName].includes(routeName)) name.value = routeName;
    else {
      const matched = currentRoute.value.matched;
      const len = matched.length;
      if (len < 2) return;
      name.value = matched[len - 2].name as string;
    }
  });
  const { getOpenKeepAlive } = useRootSetting();
  const getCaches = computed((): string[] => {
    if (!getOpenKeepAlive.value) return [];
    const cached = tabStore.getCachedMapState;
    if (isPage) return cached.get(PAGE_LAYOUT_KEY) || [];
    const cacheSet = new Set<string>();
    cacheSet.add(name.value);
    const list = cached.get(name.value);
    if (!list) return Array.from(cacheSet);
    list.forEach((item) => cacheSet.add(item));
    return Array.from(cacheSet);
  });
  return { getCaches };
}
