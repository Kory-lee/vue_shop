import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import i18n from '/@/plugins/i18n';
import { AppRouteRecordRaw, MenuType } from '/@/router/types';
import store from '/@/store';
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
    const { t } = i18n.global;
    // roleList
    return routes;
  }
}

export default getModule(Permission);
