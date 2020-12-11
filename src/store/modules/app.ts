import { getModule, Module, VuexModule } from 'vuex-module-decorators';
import store from '/@/store';
export interface LockInfo {
  pwd: string | undefined;
  isLock: boolean;
}

const NAME = 'app';
@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private pageLoadingState = false;

  get getPageLoading() {
    return this.pageLoadingState;
  }
}

export default getModule(App);
