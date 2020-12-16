<template>
  <Layout :class="prefixCls">
    <LayoutFeature />
    <Layout>
      <Layout>
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';

import LayoutContent from './components/content.vue';

import createAsyncComponent from '/@/utils/factory/createAsyncComponent';
export default defineComponent({
  components: {
    LayoutFeature: createAsyncComponent(() => import('./components/feature.vue')),
    LayoutFooter: createAsyncComponent(() => import('./components/footer.vue')),
    LayoutContent,
    Layout,
  },
  setup() {
    return {
      prefixCls: '',
    };
  },
});
</script>

<style lang="less"></style>
