<template>
  <div :class="getWrapClass">
    <Tabs
      :animated="false"
      :tab-bar-gutter="3"
      :active-key="activeKeyRef"
      hide-add
      type="editable-card"
      size="small"
      @change="handleChange"
      @edit="handleEdit"
    >
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <TabPane :closable="!item?.meta?.affix">
          <template #tab>
            <TabContent :tab-item="item" />
          </template>
        </TabPane>
      </template>

      <template v-if="getShowRefresh || getShowQuick" #rightExtra>
        <TabRefresh v-if="getShowRefresh" />
        <TabContent v-if="getShowQuick" is-extra :tab-item="$route" />
        <FoldButton v-if="getShowFold" />
      </template>
    </Tabs>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, unref } from 'vue-demi';
  import { listenerRouteChange } from '/@/logics/mitt/routeChange';
  import { REDIRECT_NAME } from '/@/router/constant';
  import TabContent from './components/TabContent.vue';
  import TabRefresh from './components/TabRefresh.vue';
  import FoldButton from './components/FoldButton.vue';
  import { Tabs } from 'ant-design-vue';
  import { initAffixTabs } from './useMultipleTabs';
  import { useMultipleTabsStore } from '/@/store/modules/multipleTabs';
  import { useUserStore } from '/@/store/modules/user';
  import { RouteLocationNormalized, useRouter } from 'vue-router';
  import { useProviderContext } from '/@/components/Application';
  import { useGo } from '/@/hooks/web/usePage';
  import {
    getShowQuick,
    getShowRefresh,
    getShowFold,
  } from '/@/hooks/setting/useMultipleTabSetting';

  export default defineComponent({
    name: 'MultipleTabs',
    components: { TabRefresh, TabContent, Tabs, TabPane: Tabs.TabPane, FoldButton },
    setup() {
      const affixTextList = initAffixTabs();
      const activeKeyRef = ref('');

      const tabStore = useMultipleTabsStore();
      const userStore = useUserStore();
      const router = useRouter();
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('multiple-tabs'),
        go = useGo();

      const getTabsState = computed(() =>
          tabStore.getTabList.filter((item) => !item.meta?.hideTab)
        ),
        unClose = computed(() => unref(getTabsState).length === 1),
        getWrapClass = computed(() => [
          prefixCls,
          { [`${prefixCls}--hide-close`]: unref(unClose) },
        ]);

      listenerRouteChange((route) => {
        const { name } = route;
        if (name === REDIRECT_NAME || !route || !userStore.getToken) return;

        const { path, fullPath, meta = {} } = route;
        const { currentActiveMenu, hideTab } = meta,
          isHide = !hideTab ? null : currentActiveMenu;

        const p = isHide || fullPath || path;
        if (activeKeyRef.value !== p) activeKeyRef.value = p as string;

        if (isHide) {
          const findParentRoute = router
            .getRoutes()
            .find((item) => item.path === currentActiveMenu);

          findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
        } else tabStore.addTab(unref(route));
      });

      function handleChange(activeKey: any) {
        activeKeyRef.value = activeKey;
        go(activeKey, false);
      }

      function handleEdit(targetKey: string) {
        if (unref(unClose)) return;
        tabStore.closeTabByKey(targetKey, router);
      }

      return {
        activeKeyRef,
        prefixCls,
        getTabsState,
        getShowRefresh,
        getShowQuick,
        getWrapClass,
        handleEdit,
        handleChange,
        getShowFold,
      };
    },
  });
</script>

<style lang="less">
  @import './index.less';
</style>
