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

export function useTabs(_router?: Router) {
  const configStore = useConfigStore(),
    tabStore = useMultipleTabsStore();

  function canIUseTabs(): boolean {
    const { show } = configStore.getMultiTabsSetting;
    if (!show) throw new Error('the multi-tab page is not open,please open it in the setting');
    return !!show;
  }

  const router = _router || useRouter();
  const { currentRoute } = router;

  function getCurrentTab() {
    const route = unref(currentRoute);
    return tabStore.getTabList.find((item) => item.path === route.path)!;
  }

  async function handleTabAction(action: TabActionEnum, tab?: RouteLocationNormalized) {
    const canIUse = canIUseTabs();
    if (!canIUse) return;
    const currentTab = getCurrentTab();
    switch (action) {
      case TabActionEnum.REFRESH:
        await tabStore.refreshPage(router);
        break;
      case TabActionEnum.CLOSE_ALL:
        await tabStore.closeAllTabs(router);
        break;
      case TabActionEnum.CLOSE_LEFT:
        await tabStore.closeLeftTabs(currentTab, router);
        break;
      case TabActionEnum.CLOSE_RIGHT:
        await tabStore.closeRightTabs(currentTab, router);
        break;
      case TabActionEnum.CLOSE_OTHER:
        await tabStore.closeOtherTabs(currentTab, router);
        break;
      case TabActionEnum.CLOSE_CURRENT:
      case TabActionEnum.CLOSE:
        await tabStore.closeTab(tab || currentTab, router);
        break;
    }
  }

  return {
    refreshPage: () => handleTabAction(TabActionEnum.REFRESH),
    closeAll: () => handleTabAction(TabActionEnum.CLOSE_ALL),
    closeLeft: () => handleTabAction(TabActionEnum.CLOSE_LEFT),
    closeRight: () => handleTabAction(TabActionEnum.CLOSE_RIGHT),
    closeOther: () => handleTabAction(TabActionEnum.CLOSE_OTHER),
    closeCurrent: (tab?: RouteLocationNormalized) =>
      handleTabAction(TabActionEnum.CLOSE_CURRENT, tab),
    close: (tab?: RouteLocationNormalized) => handleTabAction(TabActionEnum.CLOSE, tab),
  };
}
