import { toRaw, unref } from 'vue';
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { configStore, userStore } from '.';
import { PermissionModeEnum } from '/@/enums/configEnum';
import { getPermissionMode, getRootSetting } from '/@/hooks/setting/RootSetting';
import { createMessage } from '/@/hooks/web/useMessage';
import i18n from '/@/plugins/i18n';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE } from '/@/router/constant';
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
  async buildRoutesAction(id?: number | string): Promise<AppRouteRecordRaw[]> {
    let routes: AppRouteRecordRaw[] = [];
    const { t } = i18n.global,
      roleList = toRaw(userStore.getRoleListState);

    const { permissionMode } = configStore.getProjectConfig;

    if (unref(getPermissionMode) === PermissionModeEnum.ROLE) {
      routes = filter(asyncRoutes, (route) => {
        const {
          meta: { roles },
        } = route;
        if (!roles) return true;
        return roleList.some((role) => roles.includes(role));
      });
    } else if (unref(getPermissionMode) === PermissionModeEnum.BACK) {
      createMessage.loading({ content: t('sys.app.menuLoading'), duration: 1 });

      const paramId = id || userStore.getUserInfoState.userId;
      if (!paramId) throw new Error('paramId is undefined');
      let routeList = [];
      routes = [PAGE_NOT_FOUND_ROUTE, ...routeList];
    }
    routes.push(ERROR_LOG_ROUTE);

    return routes;
  }
}

export default getModule(Permission);
