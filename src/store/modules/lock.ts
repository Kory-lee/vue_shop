import type { LockInfo } from '/@/store/modules/config';

import { defineStore } from 'pinia';
import { Persistent } from '/@/utils/cache/persistent';
import { LOCK_INFO_KEY } from '/@/enums/cacheEnum';
import { useUserStore } from '/@/store/modules/user';

interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useLockStore = defineStore({
  id: 'lock',
  state: (): LockState => ({
    lockInfo: Persistent.getLocal(LOCK_INFO_KEY),
  }),
  getters: {
    getLockInfo(_) {
      return this.lockInfo;
    },
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = Object.assign({}, this.lockInfo, info);
      Persistent.setLocal(LOCK_INFO_KEY, this.lockInfo);
    },
    resetLockInfo() {
      Persistent.removeLocal(LOCK_INFO_KEY);
      this.lockInfo = null;
    },
    async unLock(password = '') {
      const userStore = useUserStore();
      if (this.lockInfo?.pwd === password) {
        this.resetLockInfo();
        return true;
      }
      const tryLogin = async () => {
        try {
          const username = userStore.getUserInfo?.username;
          const res = await userStore.login({
            username,
            password,
            goHome: false,
            mode: 'none',
          });
          if (res) this.resetLockInfo();
          return res;
        } catch (e) {
          return false;
        }
      };
      return await tryLogin();
    },
  },
});
