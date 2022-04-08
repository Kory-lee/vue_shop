import { RouteLocationNormalized, Router, useRouter } from 'vue-router';
import useConfigStore from '/@/store/modules/config';
import { useMultipleTabsStore } from '/@/store/modules/multipleTabs';
import { unref } from 'vue';

enum TabActionEnum {
  REFRESH,
  CLOSE_ALL,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_CURRENT,
  CLOSE,
}

function canIUseTabs(): boolean {
  const configStore = useConfigStore();
  const { show } = configStore.getMultiTabsSetting;
  if (!show) throw new Error('the multi-tab page is not open,please open it in the setting');
  return show;
}

export function useTabs(_router?: Router) {
  const tabStore = useMultipleTabsStore();

  const router = _router || useRouter();
  const { currentRoute } = router;

  function getCurrentTab() {
    const route = unref(currentRoute);
    return tabStore.getTabList.find((item) => item.fullPath === route.fullPath)!;
  }

  function updateTabTitle(title: string, tab?: RouteLocationNormalized) {
    const canIUse = canIUseTabs();
    if (!canIUse) return;
    const targetTab = tab || getCurrentTab();
    return tabStore.setTabTitle(title, targetTab);
  }

  function updateTabPath(path: string, tab?: RouteLocationNormalized) {
    const canIUse = canIUseTabs();
    if (!canIUse) return;
    const targetTab = tab || getCurrentTab();
    return tabStore.updateTabPath(path, targetTab);
  }

  function handleTabAction(action: TabActionEnum, tab?: RouteLocationNormalized) {
    const canIUse = canIUseTabs();
    if (!canIUse) return;
    const currentTab = getCurrentTab();
    switch (action) {
      case TabActionEnum.REFRESH:
        return tabStore.refreshPage(router);
      case TabActionEnum.CLOSE_ALL:
        return tabStore.closeAllTabs(router);
      case TabActionEnum.CLOSE_LEFT:
        return tabStore.closeLeftTabs(tab || currentTab, router);
      case TabActionEnum.CLOSE_RIGHT:
        return tabStore.closeRightTabs(tab || currentTab, router);
      case TabActionEnum.CLOSE_OTHER:
        return tabStore.closeOtherTabs(tab || currentTab, router);
      case TabActionEnum.CLOSE_CURRENT:
      case TabActionEnum.CLOSE:
        return tabStore.closeTab(tab || currentTab, router);
    }
  }

  return {
    refreshPage: () => handleTabAction(TabActionEnum.REFRESH),
    closeAll: () => handleTabAction(TabActionEnum.CLOSE_ALL),
    closeLeft: (tab?: RouteLocationNormalized) => handleTabAction(TabActionEnum.CLOSE_LEFT,tab),
    closeRight: (tab?: RouteLocationNormalized) => handleTabAction(TabActionEnum.CLOSE_RIGHT,tab),
    closeOther: () => handleTabAction(TabActionEnum.CLOSE_OTHER),
    closeCurrent: () => handleTabAction(TabActionEnum.CLOSE_CURRENT),
    close: (tab?: RouteLocationNormalized) => handleTabAction(TabActionEnum.CLOSE, tab),
    setTitle: (title: string, tab?: RouteLocationNormalized) => updateTabTitle(title, tab),
    updatePath: (path: string, tab?: RouteLocationNormalized) => updateTabPath(path, tab),
  };
}
