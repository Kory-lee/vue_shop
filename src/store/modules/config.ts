import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import tabStore from './tab';
import { APP_DARK_MODE_KEY_, PROJ_CFG_KEY } from '/@/enums/cacheEnum';
import { resetRouter } from '/@/router';
import store from '/@/store';
import { ProjectConfig } from '/@/types/config';
import { deepMerge } from '/@/utils/common';
import { getLocal, Persistent, setLocal } from '/@/utils/cache/persistent';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';
import { ThemeEnum } from '/@/enums/appEnum';
import { BeforeMiniState } from '/@/types/store';
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
const NAME = 'config';

hotModuleUnregisterModule(NAME);
@Module({ dynamic: true, namespaced: true, store, name: NAME })
class Config extends VuexModule {
  private pageLoadingState = false;
  private projectConfigState: ProjectConfig | null = getLocal(PROJ_CFG_KEY);
  private lockMainScrollState = false;

  get getPageLoading() {
    return this.pageLoadingState;
  }
  get getLockMainScrollState() {
    return this.lockMainScrollState;
  }
  get getProjectConfig(): ProjectConfig {
    return this.projectConfigState || ({} as ProjectConfig);
  }
  @Mutation
  commitPageLoadingState(loading: boolean): void {
    this.pageLoadingState = loading;
  }
  @Mutation
  commitLockMainScrollState(lock: boolean): void {
    this.lockMainScrollState = lock;
  }
  @Mutation
  commitProjectConfigState(config: DeepPartial<ProjectConfig>): void {
    this.projectConfigState = deepMerge(this.projectConfigState || {}, config);
    setLocal(PROJ_CFG_KEY, this.projectConfigState);
  }

  @Action
  async resumeAllState() {
    resetRouter();
    //TODO clear

    tabStore.commitResetState();
  }

  @Action
  public async setPageLoadingAction(loading: boolean): Promise<void> {
    if (loading) {
      clearTimeout(timeId);
      timeId = setTimeout(() => this.commitPageLoadingState(loading), 50);
    } else {
      this.commitPageLoadingState(loading);
      clearTimeout(timeId);
    }
  }
}

export default getModule(Config);

export const useConfigStore = defineStore({
  id: 'config',
  state: (): ConfigState => ({
    darkMode: undefined,
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    beforeMiniInfo: {},
  }),
  getters: {
    getPageLoading() {
      return this.pageLoading;
    },
    getDarkMode() {
      return this.darkMode || localStorage.getItem(APP_DARK_MODE_KEY_) || darkMode;
    },
    getBeforeMiniInfo() {
      return this.beforeMiniInfo;
    },
    getProjectConfig() {
      return this.projectConfig || ({} as ProjectConfig);
    },
    getHeaderSetting() {
      return this.getProjectConfig.headerSetting;
    },
    getMenuSetting() {
      return this.getProjectConfig.menuSetting;
    },
    getTransitionSetting() {
      return this.getProjectConfig.transitionSetting;
    },
    getMultiTabsSetting() {
      return this.getProjectConfig.multiTabsSetting;
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
// export function useConfigStoreWidthOut() {
//   return useConfigStore(store);
// }
