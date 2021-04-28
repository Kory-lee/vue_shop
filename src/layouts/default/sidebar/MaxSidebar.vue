<template>
  <div v-if="!isMobile && getMenuFixed" v-show="showClassSidebarRef" :style="getHiddenDomStyle" />
  <Sider
    v-show="showClassSidebarRef"
    ref="sideRef"
    breakpoint="lg"
    collapsible
    :class="getSidebarClass"
    :width="getMenuWidth"
    :collapsed="getCollapsed"
    :collapsed-width="getCollapsedWidth"
    :theme="getMenuTheme"
    v-bind="getTriggerAttr"
    @breakpoint="onBreakpointChange"
  >
    <!-- TODO doesn't work -->
    <template v-if="getShowTrigger" #trigger>
      <LayoutTrigger />
    </template>
    <LayoutMenu :theme="getMenuTheme" :menu-mode="getMode" :split-type="getSplitType" />
  </Sider>
</template>

<script lang="ts">
  import { Layout } from 'ant-design-vue';
  import { computed, CSSProperties, defineComponent, ref, unref } from 'vue';
  import LayoutMenu from '../menu/index.vue';
  import LayoutTrigger from '../trigger/index.vue';
  import { createDragLine, useSidebarEvent, useTrigger } from './useLayoutSidebar';
  import { useProviderContext } from '/@/components/Application';
  import { MenuModeEnum, MenuSplitTypeEnum } from '/@/enums/menuEnum';
  import {
    getCollapsed,
    getIsMixMode,
    getMenuFixed,
    getMenuHidden,
    getMenuTheme,
    getMenuWidth,
    getRealWidth,
    getSplit,
  } from '/@/hooks/setting/useMenuSetting';

  export default defineComponent({
    name: 'MaxSidebar',
    components: { Sider: Layout.Sider, LayoutTrigger, LayoutMenu },
    setup() {
      const dragBarRef = ref<ElRef>(null),
        sidebarRef = ref<ElRef>(null);
      createDragLine(sidebarRef, dragBarRef);

      const { isMobile, getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('layout-sidebar');

      const { getTriggerAttr, getShowTrigger } = useTrigger(isMobile),
        { getCollapsedWidth, onBreakpointChange } = useSidebarEvent();

      const getMode = computed(() => (unref(getSplit) ? MenuModeEnum.INLINE : null)),
        getSplitType = computed(() =>
          unref(getSplit) ? MenuSplitTypeEnum.LEFT : MenuSplitTypeEnum.NONE
        ),
        showClassSidebarRef = computed(() => (unref(getSplit) ? !unref(getMenuHidden) : true)),
        getSidebarClass = computed(() => [
          prefixCls,
          {
            [`${prefixCls}--fixed`]: unref(getMenuFixed),
            [`${prefixCls}--mix`]: unref(getIsMixMode) && !unref(isMobile),
          },
        ]),
        // BUG
        getHiddenDomStyle = computed(
          (): CSSProperties => {
            const width = `${unref(getRealWidth)}px`;
            return {
              width,
              overflow: `hidden`,
              flex: `0 0 ${width}`,
              maxWidth: width,
              minWidth: width,
              transition: 'all 0.2s',
            };
          }
        );


      return {
        sidebarRef,
        dragBarRef,
        getMenuFixed,
        isMobile,
        getHiddenDomStyle,
        getSidebarClass,
        getTriggerAttr,
        getCollapsedWidth,
        showClassSidebarRef,
        getMenuWidth,
        getCollapsed,
        getMenuTheme,
        onBreakpointChange,
        getMode,
        getSplitType,
        getShowTrigger,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sidebar';

  .@{prefix-cls} {
    z-index: @layout-sider-fixed-z-index;

    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    }

    &--mix {
      top: @header-height;
      height: calc(100% - @header-height);
    }
    &.ant-layout-sider-dark {
      background-color: @sider-dark-bg-color;

      .ant-layout-sider-trigger {
        color: darken(@white, 25%);
        background-color: @trigger-dark-bg-color;

        &:hover {
          color: @white;
          background: @trigger-dark-hover-bg-color;
        }
      }
    }
    &:not(.ant-layout-sider-dark) {
      .ant-layout-sider-trigger {
        color: @text-color-base;
        border-top: 1px solid @border-color-light;
      }
    }
    .ant-layout-sider-zero-width-trigger {
      top: 40%;
      z-index: 10;
    }
    & .ant-layout-sider-trigger {
      height: 36px;
      line-height: 36px;
    }
  }
</style>
