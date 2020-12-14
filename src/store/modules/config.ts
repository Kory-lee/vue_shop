import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import store from '/@/store';
import { ProjectConfig } from '/@/types/config';
// import {PROJ_CFG_KEY} from '/@/enums/cacheEnum'

export interface LockInfo {
  pwd: string | undefined;
  isLock: boolean;
}

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
}

export default getModule(Config);
