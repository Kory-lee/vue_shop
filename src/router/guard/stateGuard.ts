import { Router } from 'vue-router';
import { useMultipleTabsStore } from '/@/store/modules/multipleTabs';
import { useUserStore } from '/@/store/modules/user';
import useConfigStore from '/@/store/modules/config';
import { usePermissionStore } from '/@/store/modules/permission';
import { PageEnum } from '/@/enums/pageEnum';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    const tabStore = useMultipleTabsStore(),
      userStore = useUserStore(),
      configStore = useConfigStore(),
      permissionStore = usePermissionStore();
    if (to.path === PageEnum.BASE_LOGIN) {
      configStore.resetState();
      permissionStore.resetState();
      tabStore.resetState();
      userStore.resetState();
    }
  });
}
