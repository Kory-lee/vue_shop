import type { AppRouteRecordRaw, MenuType } from '/@/router/types';

import { toRaw } from 'vue';
import { getPermCode } from '/@/api/sys/user';
import { PermissionModeEnum } from '/@/enums/configEnum';
import { useI18n } from '/@/i18n/useI18n';
import { createMessage } from '/@/hooks/web/useMessage';
import { flatMultiLevelRoutes, transformObjToRoute } from '/@/router/helper/routeHelper';
import { asyncRoutes } from '/@/router/routes';
import store from '/@/store';
import { filter } from '/@/utils/helper/treeHelper';
import { defineStore } from 'pinia';
import { useUserStore } from '/@/store/modules/user';
import { useConfigStore } from '/@/store/modules/config';
import projectSetting from '/@/settings/projectSetting';
import { transformRouteToMenu } from '/@/utils/helper/menuHelper';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { getMenuList } from '/@/api/sys/menu';

interface PermissionState {
  permCodeList: string[];
  //  whether the route has been dynamic added
  isDynamicAddedRoute: boolean;
  lastBuildMenuTime: number;
  backMenuList: MenuType[];
  frontMenuList: MenuType[];
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    permCodeList: [],
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    backMenuList: [],
    frontMenuList: [],
  }),
  getters: {
    getPermCodeList(): string[] {
      return this.permCodeList;
    },
    getBackMenuList(): MenuType[] {
      return this.backMenuList;
    },
    getFrontMenuList(): MenuType[] {
      return this.frontMenuList;
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    setPermCodeList(codeList: string[]) {
      this.permCodeList = codeList;
    },
    setBackMenuList(list: MenuType[]) {
      this.backMenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },
    setFrontMenuList(list: MenuType[]) {
      this.frontMenuList = list;
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.permCodeList = [];
      this.backMenuList = [];
      this.lastBuildMenuTime = 0;
    },
    async changePermissionCode() {
      const codeList = await getPermCode();
      this.setPermCodeList(codeList);
    },
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      const { t } = useI18n(),
        userStore = useUserStore(),
        configStore = useConfigStore();

      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList);
      const { permissionMode = projectSetting.permissionMode } = configStore.getProjectConfig;

      const routeFilter = (route: AppRouteRecordRaw) => {
        const { meta } = route;
        const { roles } = meta || {};
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };

      switch (permissionMode) {
        case PermissionModeEnum.ROLE:
          routes = filter(asyncRoutes, routeFilter);
          routes = routes.filter(routeFilter);

          //  convert multi-level routing to level 2 routing
          routes = flatMultiLevelRoutes(routes);
          break;
        case PermissionModeEnum.ROUTE_MAPPING:
          routes = filter(asyncRoutes, routeFilter);
          routes = routes.filter(routeFilter);

          const menuList = transformRouteToMenu(asyncRoutes, true);
          menuList.sort((a, b) => (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0));

          this.setFrontMenuList(menuList);
          routes = flatMultiLevelRoutes(routes);
          break;
        case PermissionModeEnum.BACK:
          createMessage.loading({
            content: t('sys.app.menuLoading'),
            duration: 1,
          });
          // !Simulate to obtain permission codes from the background,
          // this function may only need to be executed once, and the actual project can be put at the right time by itself
          let routeList: AppRouteRecordRaw[] = [];
          try {
            this.changePermissionCode();
            routeList = (await getMenuList()) as AppRouteRecordRaw[];
          } catch (e) {
            console.error(e);
          }
          //  dynamic introduce components
          routeList = transformObjToRoute(routeList);

          const backMenuList = transformRouteToMenu(routeList);
          this.setBackMenuList(backMenuList);

          routeList = flatMultiLevelRoutes(routeList);
          routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
          console.log(routes);
          break;
      }
      routes.push(ERROR_LOG_ROUTE);
      return routes;
    },
  },
});

export function usePermissionStoreWidthOut() {
  return usePermissionStore(store);
}
