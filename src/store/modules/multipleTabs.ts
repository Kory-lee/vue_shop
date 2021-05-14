import type { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router';

import { useGo } from '/@/hooks/web/usePage';
import { toRaw, unref } from 'vue';
import projectSetting from '/@/settings/projectSetting';
import { defineStore } from 'pinia';
import { Persistent } from '/@/utils/cache/persistent';
import { MULTIPLE_TABS_KEY } from '/@/enums/cacheEnum';
import store from '/@/store';
import { getRawRoute } from '/@/utils';
import { PageEnum } from '/@/enums/pageEnum';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

export interface MultipleTabsState {
  cacheTabList: Set<string>;
  tabList: RouteLocationNormalized[];
  lastDragEndIndex: number;
}

function handleGotoPage(router: Router) {
  const go = useGo(router);
  go(unref(router.currentRoute).path, true);
}

const cacheTab = projectSetting.multipleTabsSetting.cache;

export const useMultipleTabsStore = defineStore({
  id: 'multiple-tab',
  state: (): MultipleTabsState => ({
    cacheTabList: new Set(),
    tabList: cacheTab ? Persistent.getLocal(MULTIPLE_TABS_KEY) || [] : [],
    lastDragEndIndex: 0,
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabList;
    },
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList);
    },
    getLastDragEndIndex(): number {
      return this.lastDragEndIndex;
    },
  },
  actions: {
    async updateCacheTab() {
      const cacheSet: Set<string> = new Set();
      for (const tab of this.tabList) {
        const item = getRawRoute(tab);
        const needCache = !item.meta?.ignoreKeepAlive;
        if (!needCache) return;
        const name = item.name as string;
        cacheSet.add(name);
      }
      this.cacheTabList = cacheSet;
    },
    async refreshPage(router: Router) {
      const { currentRoute } = router;
      const route = unref(currentRoute);
      const name = route.name;
      const findTab = this.getCachedTabList.find((item) => item === name);
      if (findTab) {
        this.cacheTabList.delete(findTab);
      }
    },
    clearCacheTabs(): void {
      this.cacheTabList = new Set();
    },
    resetState(): void {
      this.tabList = [];
      this.clearCacheTabs();
    },
    gotoPage(router: Router) {
      const go = useGo(router);
      const len = this.tabList.length;
      const { path } = unref(router.currentRoute);

      let toPath: PageEnum | string = PageEnum.BASE_HOME;
      if (len > 0) {
        const page = this.tabList[len - 1];
        const p = page.fullPath || page.path;
        if (p) toPath = p;
      }
      path !== toPath && go(toPath as PageEnum, true);
    },
    async addTab(route: RouteLocationNormalized) {
      const { path, name, fullPath, params, query } = getRawRoute(route);
      if (
        path === PageEnum.ERROR_PAGE ||
        !name ||
        [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(<string>name)
      ) {
        return;
      }

      let updateIndex = -1;
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index;
        return (tab.fullPath || tab.path) === (fullPath || path);
      });
      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex];
        if (!curTab) return;
        params && (curTab.params = params);
        query && (curTab.query = query);
        fullPath && (curTab.fullPath = fullPath);
        this.tabList.splice(updateIndex, 1, curTab);
        return;
      }
      //  add tab
      this.tabList.push(route);
      this.updateCacheTab();
      cacheTab && Persistent.setLocal(MULTIPLE_TABS_KEY, this.tabList);
    },
    async closeTab(tab: RouteLocationNormalized, router: Router) {
      const getToTarget = (tabItem: RouteLocationNormalized) => {
        const { params = {}, path, query = {} } = tabItem;
        return {
          params,
          path,
          query,
        };
      };
      const close = (route: RouteLocationNormalized) => {
        const { fullPath, meta: { affix } = {} } = route;
        if (affix) return;
        const index = this.tabList.findIndex((item) => item.fullPath === fullPath);
        index !== -1 && this.tabList.splice(index, 1);
      };
      const { currentRoute, replace } = router;
      const { path } = unref(currentRoute);
      if (path !== tab.path) {
        // closed is not the activation tab
        close(tab);
        return;
      }
      let toTarget: RouteLocationRaw = {};
      const index = this.tabList.findIndex((item) => item.path === path);
      if (index === 0) {
        if (this.tabList.length === 1) toTarget = PageEnum.BASE_HOME;
        else {
          const page = this.tabList[index + 1];
          toTarget = getToTarget(page);
        }
      } else {
        const page = this.tabList[index - 1];
        toTarget = getToTarget(page);
      }
      close(currentRoute.value);
      await replace(toTarget);
    },

    async closeTabByKey(key: string, router: Router) {
      const index = this.tabList.findIndex((item) => (item.fullPath || item.path) === key);
      index !== -1 && this.closeTab(this.tabList[index], router);
    },
    async sortTabs(oldIndex: number, newIndex: number) {
      const currentTab = this.tabList[oldIndex];
      this.tabList.splice(oldIndex, 1);
      this.tabList.splice(newIndex, 0, currentTab);
      this.lastDragEndIndex = this.lastDragEndIndex + 1;
    },
    async closeLeftTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex((item) => item.path === route.path);
      const pathList: string[] = [];
      if (index > 0) {
        const leftTabs = this.tabList.slice(0, index);
        for (const item of leftTabs) {
          const affix = item?.meta?.affix ?? false;
          if (!affix) pathList.push(item.fullPath);
        }
      }
      this.bulkCloseTabs(pathList);
      this.updateCacheTab();
      handleGotoPage(router);
    },
    async closeRightTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex((item) => item.fullPath === route.fullPath);
      const pathList: string[] = [];
      if (index >= 0 && index < this.tabList.length - 1) {
        const rightTabs = this.tabList.slice(index + 1, this.tabList.length);
        for (const item of rightTabs) {
          const affix = item?.meta?.affix ?? false;
          if (!affix) pathList.push(item.fullPath);
        }
      }
      this.bulkCloseTabs(pathList);
      this.updateCacheTab();
      handleGotoPage(router);
    },
    async closeAllTabs(router: Router) {
      this.tabList = this.tabList.filter((item) => item?.meta?.affix ?? false);
      this.clearCacheTabs();
      this.gotoPage(router);
    },
    async closeOtherTabs(route: RouteLocationNormalized, router: Router) {
      const closePathList = this.tabList.map((item) => item.fullPath);
      const pathList: string[] = [];
      for (const path of closePathList) {
        if (path !== route.fullPath) {
          const closeItem = this.tabList.find((item) => item.path === path);
          if (!closeItem) continue;
          const affix = closeItem?.meta?.affix ?? false;
          if (!affix) pathList.push(closeItem.fullPath);
        }
      }
      this.bulkCloseTabs(pathList);
      this.updateCacheTab();
      handleGotoPage(router);
    },
    async bulkCloseTabs(pathList: string[]) {
      if (!pathList.length) return;
      this.tabList = this.tabList.filter((item) => !pathList.includes(item.fullPath));
    },
  },
});

export function useMultipleTabsWithoutStore() {
  return useMultipleTabsStore(store);
}
