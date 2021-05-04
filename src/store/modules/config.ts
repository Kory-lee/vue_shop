import type {
  HeaderSetting,
  MenuSetting,
  MultipleTabsSetting,
  ProjectConfig,
  TransitionSetting,
} from '/@/types/config';
import type { BeforeMiniState } from '/@/types/store';

import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { resetRouter } from '/@/router';
import store from '/@/store';
import { deepMerge } from '/@/utils/common';
import { Persistent } from '/@/utils/cache/persistent';
import { ThemeEnum } from '/@/enums/configEnum';
import { defineStore } from 'pinia';
import { darkMode } from '/@/settings/styleSetting';

export interface LockInfo {
  pwd: string | undefined;
  isLock: boolean;
}

interface ConfigState {
  darkMode?: ThemeEnum;
  pageLoading: boolean;
  projectConfig: ProjectConfig | null;
  //  When the window shrinks, remember some states, and restore these states when the window is restored
  beforeMiniInfo: BeforeMiniState;
}

let timeId: TimeoutHandle;

export const useConfigStore = defineStore({
  id: 'config',
  state: (): ConfigState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getDarkMode(): 'dark' | 'light' | string {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
    },
    getBeforeMiniInfo(): BeforeMiniState {
      return this.beforeMiniInfo;
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    getMultiTabsSetting(): MultipleTabsSetting {
      return this.getProjectConfig.multipleTabsSetting;
    },
  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY_, mode);
    },
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig);
    },
    async resetAllState() {
      resetRouter();
      Persistent.clearAll();
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        timeId = setTimeout(() => this.setPageLoading(loading), 50);
        return;
      }
      this.setPageLoading(loading);
      clearTimeout(timeId);
    },
  },
});

//need to be used outside the setup
export function useConfigStoreWidthOut() {
  return useConfigStore(store);
}

export default useConfigStore;
