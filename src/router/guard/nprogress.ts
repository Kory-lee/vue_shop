import type { Router } from 'vue-router';
import nProgress from 'nprogress';
import { getOpenNProgress } from '/@/hooks/setting/useTransitionSetting';
import { unref } from 'vue';

export function createNProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.loaded) return true;
    unref(getOpenNProgress) && nProgress.start();
    return true;
  });
  router.afterEach(async () => {
    unref(getOpenNProgress) && nProgress.done();
    return true;
  });
}
