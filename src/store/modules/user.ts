import type { UserInfo } from '/@/types/store';
import type { ErrorMessageMode } from '/@/utils/http/type';
import type { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel';
import type { RouteRecordRaw } from 'vue-router';

import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { RoleEnum } from '/@/enums/roleEnum';
import { defineStore } from 'pinia';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import store from '/@/store';
import { getUserInfo, loginApi, logoutApi } from '/@/api/sys/user';
import { PageEnum } from '/@/enums/pageEnum';
import router from '/@/router';
import { useI18n } from '/@/i18n/useI18n';
import { createConfirm } from '/@/hooks/web/useMessage';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { usePermissionStore } from './permission';
import { isArray } from 'lodash-es';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    roleList: [],
    sessionTimeout: false,
    lastUpdateTime: 0,
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
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info;
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: RoleEnum[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(timeout: boolean) {
      this.sessionTimeout = timeout;
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.sessionTimeout = false;
    },
    async login(
      params: LoginParams & { goHome?: boolean; mode?: ErrorMessageMode }
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { token } = data;

        this.setToken(token);

        return this.afterLoginAction(goHome);
      } catch {
        return null;
      }
    },
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;
      const userInfo = await this.getUserInfoAction();
      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        this.setSessionTimeout(false);
      } else {
        const permissionStore = usePermissionStore();
        if (!permissionStore.isDynamicAddedRoute) {
          const routes = await permissionStore.buildRoutesAction();
          routes.forEach((route) => {
            router.addRoute(route as unknown as RouteRecordRaw);
          });
          router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
          permissionStore.setDynamicAddedRoute(true);
        }
        goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      }
      return userInfo;
    },

    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await getUserInfo();
      const { roles = [] } = userInfo;
      const roleList = isArray(roles) ? (roles.map((role) => role.value) as RoleEnum[]) : [];
      this.setRoleList(roleList);
      this.setUserInfo(userInfo);
      return userInfo;
    },
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await logoutApi();
        } catch {
          console.log('退出登录失败');
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
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
