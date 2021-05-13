import { toRaw } from 'vue';
import { getMenuListById } from '/@/api/sys/menu';
import { getPermCodeByUserId } from '/@/api/sys/user';
import { PermissionModeEnum } from '/@/enums/configEnum';
import { useI18n } from '/@/i18n/useI18n';
import { createMessage } from '/@/hooks/web/useMessage';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@/router/constant';
import { flatMultiLevelRoutes } from '/@/router/helper/routeHelper';
import { asyncRoutes } from '/@/router/routes';
import { AppRouteRecordRaw, MenuType } from '/@/router/types';
import store from '/@/store';
import { filter } from '/@/utils/helper/treeHelper';
import { defineStore } from 'pinia';
import { useUserStore } from '/@/store/modules/user';
import { useConfigStore } from '/@/store/modules/config';
import projectSetting from '/@/settings/projectSetting';
import { transformRouteToMenu } from '/@/utils/helper/menuHelper';

interface PermissionState {
  permCodeList: string[];
  //  whether the route has been dynamic added
  isDynamicAddedRoute: boolean;
  lastBuildMenuTime: number;
  backMenuList: MenuType[];
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    permCodeList: [],
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    backMenuList: [],
  }),
  getters: {
    getPermCodeList(): string[] {
      return this.permCodeList;
    },
    getBackMenuList(): MenuType[] {
      return this.backMenuList;
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
    async changePermissionCode(userId: string) {
      const codeList = await getPermCodeByUserId({ userId });
      this.setPermCodeList(codeList);
    },
    async buildRoutesAction(id?: number | string): Promise<AppRouteRecordRaw[]> {
      const { t } = useI18n(),
        userStore = useUserStore(),
        configStore = useConfigStore();

      let routes: AppRouteRecordRaw[] = [];
      const roleList = toRaw(userStore.getRoleList);
      const { permissionMode = projectSetting.permissionMode } = configStore.getProjectConfig;

      if (permissionMode === PermissionModeEnum.ROLE) {
        const routeFilter = (route: AppRouteRecordRaw) => {
          const { meta } = route;
          const { roles } = meta || {};
          if (!roles) return true;
          return roleList.some((role) => roles.includes(role));
        };
        routes = filter(asyncRoutes, routeFilter);
        routes = routes.filter(routeFilter);
        //  convert multi-level routing to level 2 routing
        routes = flatMultiLevelRoutes(routes);
      } else if (permissionMode === PermissionModeEnum.BACK) {
        // const
        createMessage.loading({
          content: t('sys.app.menuLoading'),
          duration: 1,
        });
        const paramId = id || userStore.getUserInfo?.userId;
        // !Simulate to obtain permission codes from the background,
        // this function may only need to be executed once, and the actual project can be put at the right time by itself
        try {
          this.changePermissionCode('1');
        } catch {}
        if (!paramId) throw new Error('paramID is undefined!');
        let routeList = (await getMenuListById({ id: paramId })) as AppRouteRecordRaw[];
        //  dynamic introduce components
        //

        const backMenuList = transformRouteToMenu(routeList);
        this.setBackMenuList(backMenuList);

        routeList = flatMultiLevelRoutes(routeList);
        routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
      }
      routes.push(ERROR_LOG_ROUTE);
      return routes;
    },
  },
});

export function usePermissionStoreWidthOut() {
  return usePermissionStore(store);
}
