<template>
  <Drawer v-if="isMobile" placement="left" :class="prefixCls" :visible="!getCollapsed">
    <MaxSidebar />
  </Drawer>
  <MixSidebar v-else-if="getIsMixSidebar" />
  <MaxSidebar v-else />
</template>

<script lang="ts">
  import { getCollapsed } from '/@/hooks/setting/menuSetting';
  import { Drawer } from 'ant-design-vue';
  import MixSidebar from './MixSidebar.vue';
  import MaxSidebar from './MaxSidebar.vue';
  import { defineComponent } from 'vue';
  import { useProviderContext } from '/@/components/Application/Provider/useAppContext';
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
      return {
        isMobile,
        prefixCls: getPrefixCls('layout-sider-wrapper'),
        getIsMixSidebar,
        getCollapsed,
      };
    },
  });
</script>

<style></style>
