import type { AppRouteRecordRaw } from '/@/router/types';

import { useRouter } from 'vue-router';
import { useMultipleTabsStore } from '/@/store/modules/multipleTabs';
import { computed } from 'vue-demi';
import { uniqBy } from 'lodash-es';
import { toRaw, unref } from 'vue';
import { getShowMultipleTab } from '/@/hooks/setting/useMultipleTabSetting';

export function useFrameKeepAlive() {
  const router = useRouter();
  const { currentRoute } = router;
  const tabStore = useMultipleTabsStore();
  const getFramePages = computed(
    () => getAllFramePages(toRaw(router.getRoutes()) as unknown as AppRouteRecordRaw[]) || []
  );
  const getOpenTabList = computed(() =>
    tabStore.getTabList.reduce((prev: string[], next) => {
      if (next.meta && Reflect.has(next.meta, 'frameSrc')) prev.push(next.name as string);
      return prev;
    }, [])
  );

  function getAllFramePages(routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
    let res: AppRouteRecordRaw[] = [];
    for (const route of routes) {
      const { meta: { frameSrc } = {}, children } = route;
      if (frameSrc) res.push(route);
      if (children?.length) res.push(...getAllFramePages(children));
    }
    res = uniqBy(res, 'name');
    return res;
  }

  function showIframe(item: AppRouteRecordRaw) {
    return item.name === unref(currentRoute).name;
  }
  function hasRenderFrame(name: string) {
    if (!unref(getShowMultipleTab)) return unref(currentRoute).name === name;
    return unref(getOpenTabList).includes(name);
  }
  return { getFramePages, getAllFramePages, showIframe, hasRenderFrame };
}

export default useFrameKeepAlive;
