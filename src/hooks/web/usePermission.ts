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
import { intersection } from 'lodash-es';

export function usePermission() {
  const userStore = useUserStore(),
    configStore = useConfigStore(),
    permissionStore = usePermissionStore(),
    { closeAll } = useTabs(router);

  async function togglePermissionMode() {
    configStore.setProjectConfig({
      permissionMode:
        projectSetting.permissionMode === PermissionModeEnum.BACK
          ? PermissionModeEnum.ROUTE_MAPPING
          : PermissionModeEnum.BACK,
    });
    location.reload();
  }
  async function resume() {
    const tabsStore = useMultipleTabsStore();
    tabsStore.clearCacheTabs();
    resetRouter();
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    permissionStore.setLastBuildMenuTime();
    await closeAll();
  }

  function hasPermission(value?: RoleEnum | RoleEnum[] | string | string[], def = true): boolean {
    if (!value) return def;
    const permMode = projectSetting.permissionMode;
    if ([PermissionModeEnum.ROUTE_MAPPING, PermissionModeEnum.ROLE].includes(permMode)) {
      if (!isArray(value)) {
        return userStore.getRoleList?.includes(value as RoleEnum);
      }

      return intersection(value, userStore.getRoleList).length > 0;
    }
    if (PermissionModeEnum.BACK === permMode) {
      const allCodeList = permissionStore.getPermCodeList;
      if (!isArray(value)) {
        return allCodeList.includes(value);
      }
      return intersection(value, allCodeList).length > 0;
    }
    return true;
  }

  async function changeRole(roles: RoleEnum | RoleEnum[]): Promise<void> {
    if (projectSetting.permissionMode !== PermissionModeEnum.ROUTE_MAPPING)
      throw new Error(
        'please switch permissionModeEnum to ROLE mode in the configuration to operate'
      );
    if (!isArray(roles)) roles = [roles];
    userStore.setRoleList(roles);
    await resume();
  }
  async function refreshMenu() {
    resume();
  }
  return { togglePermissionMode, changeRole, hasPermission, resume, refreshMenu };
}
