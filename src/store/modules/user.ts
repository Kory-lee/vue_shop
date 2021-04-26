import type {
  GetUserInfoByUserIdModel,
  GetUserInfoByUserIdParams,
  LoginParams,
} from '/@/api/sys/model/userModel';
import type { UserInfo } from '/@/types/store';

import type { ErrorMessageMode } from '/@/utils/http/type';

import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { RoleEnum } from '/@/enums/roleEnum';
import { defineStore } from 'pinia';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import store from '/@/store';
import { getUserInfoById, loginApi } from '/@/api/sys/user';
import { PageEnum } from '/@/enums/pageEnum';
import router from '/@/router';
import { useI18n } from '/@/i18n/useI18n';
import { createConfirm } from '/@/hooks/web/useMessage';

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
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
    },
    async login(
      params: LoginParams & { goHome?: boolean; mode?: ErrorMessageMode }
    ): Promise<GetUserInfoByUserIdModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { token, userId } = data;

        this.setToken(token);

        const userInfo = await this.getUserInfoAction({ userId });
        goHome && (await router.replace(PageEnum.BASE_HOME));
        return userInfo;
      } catch {
        return null;
      }
    },
    async getUserInfoAction({ userId }: GetUserInfoByUserIdParams) {
      const userInfo = await getUserInfoById({ userId });
      const { roles } = userInfo;
      const roleList = roles.map((item) => item.value) as RoleEnum[];

      this.setUserInfo(userInfo);
      this.setRoleList(roleList);
      return userInfo;
    },
    logout(goLogin = false) {
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },
    confirmLoginOut() {
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: t('sys.app.logoutTip'),
        content: t('sys.app.logoutMessage'),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

export function useUserStoreWithout() {
  return useUserStore(store);
}
