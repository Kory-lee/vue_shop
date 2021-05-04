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

      <template v-if="getShowRefresh || getShowQuick" #tabBarExtraContent>
        <TabRefresh v-if="getShowRefresh" />
        <TabContent v-if="getShowQuick" is-extra :tab-item="$route" />
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
  import { Tabs } from 'ant-design-vue';
  import { initAffixTabs } from './useMultipleTabs';
  import { useMultipleTabsStore } from '/@/store/modules/multipleTabs';
  import { useUserStore } from '/@/store/modules/user';
  import { RouteLocationNormalized, useRouter } from 'vue-router';
  import { useProviderContext } from '/@/components/Application';
  import { useGo } from '/@/hooks/web/usePage';
  import { getShowQuick, getShowRefresh } from '/@/hooks/setting/useMultipleTabSetting';

  export default defineComponent({
    name: 'MultipleTabs',
    components: { TabRefresh, TabContent, Tabs, TabPane: Tabs.TabPane },
    setup() {
      const affixTextList = initAffixTabs();
      const activeKeyRef = ref('');

      const tabStore = useMultipleTabsStore(),
        userStore = useUserStore(),
        router = useRouter(),
        { getPrefixCls } = useProviderContext(),
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
        if (activeKeyRef !== p) activeKeyRef.value = p;

        if (isHide) {
          const findParentRoute = router
            .getRoutes()
            .find((item) => item.path === currentActiveMenu);

          findParentRoute &&
            tabStore.addTab((findParentRoute as unknown) as RouteLocationNormalized);
        } else tabStore.addTab(unref(route));
      });

      function handleChange(activeKey: unknown) {
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
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-multiple-tabs';

  html[data-theme='dark'] {
    .@{prefix-cls} {
      .ant-tabs-tab {
        border-bottom: 1px solid @border-color-base;
      }
    }
  }
  html[data-theme='light'] {
    .@{prefix-cls} {
      .ant-tabs-tab {
        border-bottom: 1px solid #d9d9d9 !important;
      }
    }
  }
  .@{prefix-cls} {
    z-index: 10;
    height: @multiple-height+2;
    line-height: @multiple-height+2;
    background-color: @component-background;
    border-bottom: 1px solid @border-color-base;

    .ant-tabs-small {
      height: @multiple-height;
    }

    .ant-tabs.ant-tabs-card {
      .ant-tabs-card-bar {
        height: @multiple-height;
        margin: 0;
        background-color: @component-background;
        border: 0;
        box-shadow: none;

        .ant-tabs-nav-container {
          height: @multiple-height;
          padding-top: 2px;
        }
        .ant-tabs-tab {
          height: calc(@multiple-height - 2px);
          padding-right: 12px;
          line-height: calc(@multiple-height - 2px);
          color: @text-color-base;
          background-color: @component-background;
          transition: none;

          &:hover {
            .ant-tabs-close-x {
              opacity: 1;
            }
          }
          .ant-tabs-close-x {
            width: 8px;
            height: 12px;
            font-size: 12px;
            color: inherit;
            opacity: 0;
            transition: none;

            &:hover {
              svg {
                width: 0.8em;
              }
            }
          }
          > div {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          svg {
            fill: @text-color-base;
          }
        }
        .ant-tabs-tab:not(.ant-tabs-tab-active) {
          &:hover {
            color: @primary-color;
          }
        }

        .ant-tabs-tab-active {
          position: relative;
          padding-left: 18px;
          color: @white !important;
          background: @primary-color;
          border: 0;
          transition: none;

          .ant-tabs-close-x {
            opacity: 1;
          }

          svg {
            width: 0.7em;
            fill: @white;
          }
        }
      }
      .ant-tabs-nav > div:nth-child(1) {
        padding: 0 6px;

        .ant-tabs-tab {
          margin-right: 3px !important;
        }
      }
    }
    .ant-tabs-tab:not(.ant-tabs-tab-active) {
      .anticon-close {
        font-size: 12px;

        svg {
          width: 0.6em;
        }
      }
    }
    .ant-tabs-extra-content {
      margin-top: 2px;
      line-height: @multiple-height !important;
    }

    .ant-dropdown-trigger {
      display: inline-flex;
    }
    &--hide-close {
      .ant-tabs-close-x {
        opacity: 0 !important;
      }
    }
    &-content {
      &__extra-quick,
      &__extra-refresh,
      &__extra-fold {
        display: inline-block;
        width: 36px;
        height: @multiple-height;
        line-height: @multiple-height;
        color: @text-color-secondary;
        text-align: center;
        cursor: pointer;
        border-left: 1px solid @border-color-base;

        &:hover {
          color: @text-color-base;
        }

        span[role='img'] {
          transform: rotate(90deg);
        }
      }

      &__extra-refresh {
        span[role='img'] {
          transform: rotate(0deg);
        }
      }

      &__info {
        display: inline-block;
        width: 100%;
        height: @multiple-height - 2;
        padding-left: 0;
        margin-left: -10px;
        font-size: 12px;
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>
