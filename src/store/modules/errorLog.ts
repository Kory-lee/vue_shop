import type { ErrorLogInfo } from '/@/types/store';

import { defineStore } from 'pinia';
import { formatToDateTime } from '/@/utils/date';
import projectSetting from '/@/settings/projectSetting';
import { ErrorTypeEnum } from '/@/enums/exceptionEnum';
import store from '/@/store';

export interface ErrorLogState {
  errorLogInfoList: Nullable<ErrorLogInfo[]>;
  errorLogListCount: number;
}

export const useErrorLogStore = defineStore({
  id: 'error-log',
  state: (): ErrorLogState => ({
    errorLogInfoList: null,
    errorLogListCount: 0,
  }),
  getters: {
    getErrorLogInfoList(): Nullable<ErrorLogInfo[]> {
      return this.errorLogInfoList || [];
    },
    getErrorLogListCount(): number {
      return this.errorLogListCount;
    },
  },
  actions: {
    addErrorLogInfo(info: ErrorLogInfo) {
      const item = { ...info, time: formatToDateTime(new Date()) };
      this.errorLogInfoList = [item, ...(this.errorLogInfoList || [])];
      this.errorLogListCount++;
    },

    setErrorLogListCount(count: number): void {
      this.errorLogListCount = count;
    },

    addAjaxErrorInfo(error: any) {
      const { useErrorHandle } = projectSetting;
      if (!useErrorHandle) return;

      const errorInfo: Partial<ErrorLogInfo> = {
        message: error.message,
        type: ErrorTypeEnum.AJAX,
      };
      if (error.response) {
        const {
          config: { url = '', data: params = '', method = 'get', headers = {} } = {},
          data = {},
        } = error.response;
        errorInfo.url = url;
        errorInfo.name = 'Ajax Error';
        errorInfo.file = '-';
        errorInfo.stack = JSON.stringify(data);
        errorInfo.detail = JSON.stringify({ params, method, headers });
      }
      this.addErrorLogInfo(errorInfo as ErrorLogInfo);
    },
  },
});
// Need to be used outside the setup
export function useErrorLogStoreWithOut() {
  return useErrorLogStore(store);
}
