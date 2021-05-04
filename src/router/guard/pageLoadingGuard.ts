import type { Router } from 'vue-router';

import { unref } from 'vue';
import { getOpenPageLoading } from '/@/hooks/setting/useTransitionSetting';
import { useUserStoreWithout } from '/@/store/modules/user';
import { useConfigStoreWidthOut } from '/@/store/modules/config';

export default function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithout(),
    configStore = useConfigStoreWidthOut();

  router.beforeEach(async (to) => {
    if (!userStore.getToken) return true;

    if (to.meta.loaded) return true;

    if (unref(getOpenPageLoading)) {
      await configStore.setPageLoadingAction(true);
      return true;
    }
    return true;
  });

  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) setTimeout(() => configStore.setPageLoading(false), 260);
    return true;
  });
}
