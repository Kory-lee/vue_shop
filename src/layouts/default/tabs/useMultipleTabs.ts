import { ref, unref } from 'vue';
import { useMultipleTabsStore } from '/@/store/modules/multipleTabs';
import { RouteLocationNormalized, useRouter } from 'vue-router';

export function initAffixTabs(): string[] {
  const affixList = ref<RouteLocationNormalized[]>([]);

  const tabStore = useMultipleTabsStore();
  const router = useRouter();

  function filterAffixTabs(routes: RouteLocationNormalized[]) {
    const tabs: RouteLocationNormalized[] = [];
    if (!routes?.length) return tabs;
    routes.forEach((route) => {
      if (route.meta && route.meta.affix) tabs.push(route);
    });
    return tabs;
  }

  function addAffixTabs(): void {
    const affixTabs = filterAffixTabs((router.getRoutes() as unknown) as RouteLocationNormalized[]);
    affixList.value = affixTabs;
    for (const { meta, name, path } of affixTabs) {
      tabStore.addTab({
        meta,
        name,
        path,
      } as RouteLocationNormalized);
    }
  }

  let isAddAffix = false;
  if (!isAddAffix) {
    addAffixTabs();
    isAddAffix = true;
  }
  return unref(affixList)
    .map((item) => item.meta?.title)
    .filter(Boolean) as string[];
}
