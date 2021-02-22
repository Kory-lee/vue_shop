import { getModule, Module, VuexModule } from 'vuex-module-decorators';
import { useProjectSetting } from '/@/hooks/setting';
import store from '/@/store';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';

// export type UserInfo = Omit<GetUserInfoByUserIdMoel
const name = 'user';

hotModuleUnregisterModule(name);

function getCache<T>(key: string) {
  const { permissionCacheType } = useProjectSetting();
  const fn = permissionCacheType;
}

@Module({ namespaced: true, name, store })
class User extends VuexModule {
  // private userInfoState: UserInfo | null = null;
}

export default getModule(User);
