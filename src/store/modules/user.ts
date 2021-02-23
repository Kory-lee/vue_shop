import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { GetUserInfoByUserIdModel } from '/@/api/sys/model/userModel';
import { CacheTypeEnum, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { RoleEnum } from '/@/enums/roleEnums';
import { useProjectSetting } from '/@/hooks/setting';
import store from '/@/store';
import { getLocal, getSession } from '/@/utils/helper/persistent';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';

export type UserInfo = Omit<GetUserInfoByUserIdModel, 'roles'>;
const name = 'user';

hotModuleUnregisterModule(name);

function getCache<T>(key: string) {
  const { permissionCacheType } = useProjectSetting();
  const fn = permissionCacheType === CacheTypeEnum.LOCAL ? getLocal : getSession;
  return fn(key) as T;
}

@Module({ namespaced: true, name, store })
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
    // setCache
  }
}

export default getModule(User);
