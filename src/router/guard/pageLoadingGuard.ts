import { unref } from 'vue';
import { Router } from 'vue-router';
import { getOpenPageLoading } from '/@/hooks/setting/useTransitionSetting';
import { configStore, userStore } from '/@/store/modules';

export default function createPageLoadingGuard(router: Router) {
  router.beforeEach(async (to) => {
    // TODO
    // if (!userStore.getTokenState) return true;
    // else if (to.meta.loaded) return true;
    // console.log(to);

    if (unref(getOpenPageLoading)) {
      configStore.setPageLoadingAction(true);
    }
    return true;
  });

  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) setTimeout(() => configStore.commitPageLoadingState(false), 300);
    return true;
  });
}
