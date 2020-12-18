import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import tabStore from './tab';
import { resetRouter } from '/@/router';
import store from '/@/store';
import { ProjectConfig } from '/@/types/config';

// import { PROJ_CFG_KEY } from '/@/enums/cacheEnum';

export interface LockInfo {
  pwd: string | undefined;
  isLock: boolean;
}
let timeId: TimeoutHandle;
const NAME = 'config';

@Module({ dynamic: true, namespaced: true, store, name: NAME })
class Config extends VuexModule {
  private pageLoadingState = false;
  private projectConfigState: ProjectConfig | null;
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
    // this.projectConfigState = deepMerge;
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
