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

import LayoutHeader from './components/header/index.vue';
import LayoutContent from './components/content.vue';
import { getPrefixCls as customizePrefixCls } from '/@/components/Application';

import createAsyncComponent from '/@/utils/factory/createAsyncComponent';
export default defineComponent({
  components: {
    LayoutFeature: createAsyncComponent(() => import('./components/feature.vue')),
    LayoutFooter: createAsyncComponent(() => import('./components/footer.vue')),
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
