<template>
  <Layout :class="prefixCls">
    <Layout>
      <Layout>
        <LayoutContent></LayoutContent>
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import LayoutContent from './components/content.vue';
export default defineComponent({
  components: { Layout, LayoutContent },
  setup() {
    return {
      prefixCls: '',
    };
  },
});
</script>

<style lang="less"></style>
