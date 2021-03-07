import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import {
  GetUserInfoByUserIdModel,
  GetUserInfoByUserIdParams,
  LoginParams,
} from '/@/api/sys/model/userModel';
import { getUserInfoById, loginApi } from '/@/api/sys/user';
import { CacheTypeEnum, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { RoleEnum } from '/@/enums/roleEnums';
import { useProjectSetting } from '/@/hooks/setting';
import router from '/@/router';
import store from '/@/store';
import { getLocal, getSession, setLocal, setSession } from '../../utils/cache/persistent';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';
import { ErrorMessageMode } from '/@/utils/http/type';

export type UserInfo = Omit<GetUserInfoByUserIdModel, 'roles'>;
const name = 'user';

hotModuleUnregisterModule(name);

function getCache<T>(key: string) {
  const { permissionCacheType } = useProjectSetting();
  const fn = permissionCacheType === CacheTypeEnum.LOCAL ? getLocal : getSession;
  return fn(key) as T;
}
function setCache(USER_INFO_KEY: string, info: any) {
  if (!info) return;
  setLocal(USER_INFO_KEY, info, true);
  setSession(USER_INFO_KEY, info, true);
}
@Module({ namespaced: true, name, dynamic: true, store })
class User extends VuexModule {
  private userInfoState: UserInfo | null = null;
  private tokenState = '';
  private roleListState: RoleEnum[] = [];

  get getUserInfoState(): UserInfo {
    return this.userInfoState || getCache<UserInfo>(USER_INFO_KEY) || {};
  }
  get getTokenState(): string {
    return this.tokenState || getCache(TOKEN_KEY);
  }
  get getRoleListState(): RoleEnum[] {
    return this.roleListState.length ? this.roleListState : getCache(ROLES_KEY);
  }

  @Mutation
  commitResetState(): void {
    this.userInfoState = null;
    this.tokenState = '';
    this.roleListState = [];
  }

  @Mutation
  commitUserInfoState(info: UserInfo) {
    this.userInfoState = info;
    setCache(USER_INFO_KEY, info);
  }

  @Mutation
  commitRoleListState(roleList: RoleEnum[]) {
    this.roleListState = roleList;
    setCache(ROLES_KEY, roleList);
  }

  @Mutation
  commitTokenState(info: string) {
    this.tokenState = info;
    setCache(TOKEN_KEY, info);
  }

  @Action
  async login(
    params: LoginParams & { goHome?: boolean; mode?: ErrorMessageMode }
  ): Promise<GetUserInfoByUserIdModel | null> {
    try {
      const { goHome = true, mode, ...loginParams } = params,
        data = await loginApi(loginParams, mode),
        { token, userId } = data;
      this.commitTokenState(token);

      const userInfo = await this.getUserInfoAction({ userId });
      goHome && (await router.replace(PageEnum.BASE_HOME));
      return userInfo;
    } catch (e) {
      return null;
    }
  }

  @Action
  async getUserInfoAction({ userId }: GetUserInfoByUserIdParams) {
    const userInfo = await getUserInfoById({ userId }),
      { roles } = userInfo,
      roleList = roles.map((item) => item.value) as RoleEnum[];
    this.commitUserInfoState(userInfo);
    this.commitRoleListState(roleList);
    return userInfo;
  }
}

export default getModule(User);
