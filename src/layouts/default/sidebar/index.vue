<template>
  <Drawer
    v-if="isMobile"
    placement="left"
    :class="prefixCls"
    :visible="!getCollapsed"
    @close="handleClose"
    :getContainer="null"
    :width="getMenuWidth"
  >
    <MaxSidebar />
  </Drawer>
  <MixSidebar v-else-if="getIsMixSidebar" />
  <MaxSidebar v-else />
</template>

<script lang="ts">
  import {
    getCollapsed,
    getIsMixMode,
    getMenuWidth,
    setMenuSetting,
  } from '/@/hooks/setting/menuSetting';
  import { Drawer } from 'ant-design-vue';
  import MixSidebar from './MixSidebar.vue';
  import MaxSidebar from './MaxSidebar.vue';
  import { defineComponent } from 'vue';
  import { useProviderContext } from '../../../components/Application/src/Provider/useAppContext';
  import { getIsMixSidebar } from '/@/hooks/setting/menuSetting';
  export default defineComponent({
    name: 'LayoutSidebar',
    components: {
      Drawer,
      MixSidebar,
      MaxSidebar,
    },
    setup() {
      const { isMobile, getPrefixCls } = useProviderContext();
      function handleClose() {
        setMenuSetting({ collapsed: true });
      }
      return {
        isMobile,
        prefixCls: getPrefixCls('layout-sider-wrapper'),
        getIsMixSidebar,
        getCollapsed,
        handleClose,
        getMenuWidth,
        getIsMixMode,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sider-wrapper';
  .@{prefix-cls} {
    .ant-drawer-body {
      height: 100vh;
      padding: 0;
    }
    .ant-drawer-header-no-title {
      display: none;
    }
  }
</style>
