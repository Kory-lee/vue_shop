import { toRaw } from 'vue';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { configStore, userStore } from '.';
import { getMenuListById } from '/@/api/sys/menu';
import { getPermCodeByUserId } from '/@/api/sys/user';
import { PermissionModeEnum } from '/@/enums/configEnum';
import { useI18n } from '/@/locales/useI18n';
import { createMessage } from '/@/hooks/web/useMessage';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@/router/constant';
import { flatMultiLevelRoutes } from '/@/router/helper/routeHelper';
import { asyncRoutes } from '/@/router/routes';
import { AppRouteRecordRaw, MenuType } from '/@/router/types';
import store from '/@/store';
import { filter } from '/@/utils/helper/treeHelper';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';

const NAME = 'permission';

hotModuleUnregisterModule(NAME);

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class Permission extends VuexModule {
  private permCodeListState: string[] = [];

  private isDynamicAddedRouteState = false;

  private lastBuildMenuTimeState = 0;

  private backMenuListState: MenuType[] = [];

  get getPermCodeListState() {
    return this.permCodeListState;
  }
  get getBackMenuListState() {
    return this.backMenuListState;
  }
  get getLastBuildMenuTimeState() {
    return this.lastBuildMenuTimeState;
  }
  get getIsDynamicAddedRouteState() {
    return this.isDynamicAddedRouteState;
  }

  @Mutation
  commitPermCodeListState(codeList: string[]): void {
    this.permCodeListState = codeList;
  }
  @Mutation
  commitBackMenuListState(list: MenuType[]): void {
    this.backMenuListState = list;
  }

  @Mutation
  commitLastBuildMenuTimeState() {
    this.lastBuildMenuTimeState = new Date().getTime();
  }
  @Mutation
  commitDynamicAddedRouteState(added: boolean): void {
    this.isDynamicAddedRouteState = added;
  }

  @Mutation
  commitResetState(): void {
    this.isDynamicAddedRouteState = false;
    this.permCodeListState = [];
    this.backMenuListState = [];
    this.lastBuildMenuTimeState = 0;
  }
  @Action
  async changePermissionCode(userId: string) {
    const codeList = await getPermCodeByUserId({ userId });
    this.commitPermCodeListState(codeList);
  }

  @Action
  async buildRoutesAction(id?: number | string): Promise<AppRouteRecordRaw[]> {
    let routes: AppRouteRecordRaw[] = [];
    const { t } = useI18n(),
      roleList = toRaw(userStore.getRoleListState);

    const { permissionMode = PermissionModeEnum.ROLE } = configStore.getProjectConfig;

    if (permissionMode === PermissionModeEnum.ROLE) {
      const routeFilter = (route: AppRouteRecordRaw) => {
        const {
          meta: { roles },
        } = route;
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      };
      routes = filter(asyncRoutes, routeFilter);
      routes = routes.filter(routeFilter);

      routes = flatMultiLevelRoutes(routes);
    } else if (permissionMode === PermissionModeEnum.BACK) {
      createMessage.loading({ content: t('sys.app.menuLoading'), duration: 1 });

      const paramId = id || userStore.getUserInfoState.userId;

      // !Simulate to obtain permission codes from the background
      // this function may only need to be executed once, and the actual project can be put at the right time by itself
      try {
        this.changePermissionCode('1');
      } catch (e) {}

      if (!paramId) throw new Error('paramId is undefined');

      let routeList = (await getMenuListById({ id: paramId })) as AppRouteRecordRaw[];
      //TODO  routeList = transformO

      routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
    }
    routes.push(ERROR_LOG_ROUTE);
    return routes;
  }
}

export default getModule(Permission);
