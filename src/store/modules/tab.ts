import { unref } from 'vue';
import { RouteLocationNormalized, useRouter } from 'vue-router';
import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { PageEnum } from '/@/enums/pageEnum';
import { useGo } from '/@/hooks/web/usePage';
import router from '/@/router';
import store from '/@/store';
import { getRoute } from '/@/utils/helper/routeHelper';
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
  get getLastDragEndIndexState() {
    return this.lastDragEndIndexState;
  }

  @Mutation
  commitClearCache() {
    this.cachedMapState = new Map();
  }

  @Mutation
  goToPage() {
    const go = useGo();
    const len = this.tabsState.length;
    const { path } = unref(router.currentRoute);
    let toPath: PageEnum | string = PageEnum.BASE_HOME;
    if (len > 0) {
      const page = this.tabsState[len - 1];
      const p = page.fullPath || page.path;
      if (p) toPath = p;
    }

    path !== toPath && go(toPath, true);
  }

  @Mutation
  commitResetState() {
    this.tabsState = [];
    this.cachedMapState = new Map();
  }

  @Mutation
  commitCacheMapState() {
    const cacheMap = new Map<string, string[]>();
    const pageCacheSet = new Set<string>();

    this.tabsState.forEach((tab) => {
      const item = getRoute(tab),
        needCache = !item.meta?.ignoreKeepAlive;
      if (!needCache) return;
      if (item.meta?.affix) {
      }
    });
  }
}

export default getModule(Tab);
