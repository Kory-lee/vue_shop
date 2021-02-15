<template>
  <Layout :class="prefixCls">
    <LayoutFeature />
    <LayoutHeader fixed v-if="getShowFullHeaderRef" />
    <Layout :class="{ 'ant-layout-has-sider': getIsMixSidebar }">
      <LayoutSidebar v-if="getShowSidebar || isMobile" />
      <Layout :class="`${prefixCls}__main`">
        <LayoutMultipleHeader />
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
  import { Layout } from 'ant-design-vue';
  import { defineComponent } from 'vue';
  import LayoutContent from './content/index.vue';
  import LayoutHeader from './header/index.vue';
  import LayoutMultipleHeader from './header/MultipleHeader.vue';
  import LayoutSidebar from './sidebar/index.vue';
  import { useProviderContext } from '/@/components/Application/Provider/useAppContext';
  import { getShowFullHeaderRef } from '/@/hooks/setting/headerSetting';
  import { getIsMixSidebar, getShowSidebar } from '/@/hooks/setting/menuSetting';
  import createAsyncComponent from '/@/utils/factory/createAsyncComponent';
  export default defineComponent({
    components: {
      LayoutFeature: createAsyncComponent(() => import('./feature/index.vue')),
      LayoutFooter: createAsyncComponent(() => import('./footer/index.vue')),
      LayoutContent,
      LayoutHeader,
      LayoutSidebar,
      LayoutMultipleHeader,
      Layout,
    },
    setup() {
      const { isMobile, getPrefixCls } = useProviderContext();
      return {
        prefixCls: getPrefixCls('default-layout'),
        getShowFullHeaderRef,
        isMobile,
        getIsMixSidebar,
        getShowSidebar,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-default-layout';
  .@{prefix-cls} {
    display: flex;
    width: 100%;
    min-height: 100%;
    background: @content-bg;
    flex-direction: column;

    > .ant-layout {
      min-height: 100%;
    }

    &__main {
      margin-left: 1px;
    }
  }
</style>
