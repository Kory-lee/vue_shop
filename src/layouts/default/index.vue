<template>
  <Layout :class="prefixCls">
    <LayoutFeature />
    <LayoutHeader />
    <Layout>
      <Layout>
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { Layout } from 'ant-design-vue';

import LayoutHeader from './header/index.vue';
import LayoutContent from './content.vue';
import { getPrefixCls as customizePrefixCls } from '/@/components/Application';

import createAsyncComponent from '/@/utils/factory/createAsyncComponent';
export default defineComponent({
  components: {
    LayoutFeature: createAsyncComponent(() => import('./feature.vue')),
    LayoutFooter: createAsyncComponent(() => import('./footer.vue')),
    LayoutContent,
    LayoutHeader,
    Layout,
  },
  setup() {
    const isMobile = inject('isMobile');
    const getPrefixCls = inject('getPrefixCls', customizePrefixCls);
    // const get
    return {
      prefixCls: getPrefixCls('default-layout'),
    };
  },
});
</script>

<style lang="less"></style>
