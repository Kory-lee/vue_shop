import { RouteLocationNormalized, useRouter } from 'vue-router';
import { getModule, Module, VuexModule } from 'vuex-module-decorators';
import store from '/@/store';
const NAME = 'tab';
export const PAGE_LAYOUT_KEY = '__PAGE__LAYOUT__';

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class Tab extends VuexModule {
  cachedMapState = new Map<string, string[]>();
  tabsState: RouteLocationNormalized[] = [];
  lastDragEndIndexState = 0;

  get getTabsState() {
    return this.tabsState;
  }
  get getCurrentTab() {
    const router = useRouter();
    const route = router.currentRoute.value;
    return this.tabsState.find((item) => item.path === route.path)!;
  }
  get getCachedMapState() {
    return this.cachedMapState;
  }
}

export default getModule(Tab);
