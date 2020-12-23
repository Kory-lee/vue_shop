<template>
  <Drawer v-if="isMobile" placement="left" :class="prefixCls" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { Drawer } from 'ant-design-vue';
import { getPrefixCls as customizePrefixCls } from '/@/components/Application';
export default defineComponent({
  name: 'SideBarWrapper',
  components: { Drawer },
  setup() {
    const isMobile = inject('isMobile');
    const getPrefixCls = inject('getPrefixCls', customizePrefixCls);

    return { isMobile, prefixCls: getPrefixCls('layout-sider-wrapper') };
  },
});
</script>

<style></style>
