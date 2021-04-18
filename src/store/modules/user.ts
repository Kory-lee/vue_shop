import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { RoleEnum } from '/@/enums/roleEnum';
import { defineStore } from 'pinia';
import { UserInfo } from '/@/types/store';
import { getAuthCache } from '/@/utils/auth';
import store from '/@/store';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache(TOKEN_KEY);
    },
    getRoleList(): RoleEnum[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache(ROLES_KEY);
    },
  },
  actions: {
    setToken(info: string) {
      this.token = info;
      // setA;
    },
  },
});

export function useUserStoreWithout() {
  return useUserStore(store);
}
