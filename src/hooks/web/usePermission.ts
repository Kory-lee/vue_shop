import type { RouteRecordRaw } from 'vue-router';

import { useUserStore } from '/@/store/modules/user';
import useConfigStore from '/@/store/modules/config';
import projectSetting from '/@/settings/projectSetting';
import { PermissionModeEnum } from '/@/enums/configEnum';
import { RoleEnum } from '/@/enums/roleEnum';
import { isArray } from '/@/utils/is';
import { useMultipleTabsStore } from '/@/store/modules/multipleTabs';
import router, { resetRouter } from '/@/router';
import { usePermissionStore } from '/@/store/modules/permission';
import { useTabs } from '/@/hooks/web/useTabs';

export function usePermission() {
  const userStore = useUserStore(),
    configStore = useConfigStore(),
    permissionStore = usePermissionStore(),
    { closeAll } = useTabs(router);

  async function togglePermissionMode() {
    configStore.setProjectConfig({
      permissionMode:
        projectSetting.permissionMode === PermissionModeEnum.BACK
          ? PermissionModeEnum.ROLE
          : PermissionModeEnum.BACK,
    });
    location.reload();
  }
  async function resume(id?: string | number) {
    const tabsStore = useMultipleTabsStore();
    tabsStore.clearCacheTabs();
    resetRouter();
    const routes = await permissionStore.buildRoutesAction(id);
    routes.forEach((route) => {
      router.addRoute((route as unknown) as RouteRecordRaw);
    });
    permissionStore.setLastBuildMenuTime();
    await closeAll();
  }

  async function changeRole(roles: RoleEnum | RoleEnum[]): Promise<void> {
    if (projectSetting.permissionMode !== PermissionModeEnum.ROLE)
      throw new Error(
        'please switch permissionModeEnum to ROLE mode in the configuration to operate'
      );
    if (!isArray(roles)) roles = [roles];
    userStore.setRoleList(roles);
    await resume();
  }
  return { togglePermissionMode, changeRole, resume };
}
