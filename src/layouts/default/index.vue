<template>
  <Layout :class="prefixCls">
    <LayoutFeature />
    <LayoutHeader v-if="getShowFullHeaderRef" fixed />
    <Layout :class="layoutClass">
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
  import { computed, defineComponent, unref } from 'vue';
  import LayoutContent from './content/index.vue';
  import LayoutHeader from './header/index.vue';
  import LayoutMultipleHeader from './header/MultipleHeader.vue';
  import LayoutSidebar from './sidebar/index.vue';
  import { useProviderContext } from '/@/components/Application';
  import { getShowFullHeaderRef } from '/@/hooks/setting/useHeaderSetting';
  import { getIsMixSidebar, getShowSidebar, getShowMenu } from '/@/hooks/setting/useMenuSetting';
  import createAsyncComponent from '/@/utils/factory/createAsyncComponent';

  export default defineComponent({
    name: 'KLayout',
    components: {
      Layout,
      LayoutFeature: createAsyncComponent(() => import('./feature/index.vue')),
      LayoutFooter: createAsyncComponent(() => import('./footer/index.vue')),
      LayoutContent,
      LayoutHeader,
      LayoutSidebar,
      LayoutMultipleHeader,
    },
    setup() {
      const { isMobile, getPrefixCls } = useProviderContext();
      const layoutClass = computed(() => {
        return [
          'ant-layout',
          {
            'ant-layout-has-sider': unref(getIsMixSidebar) || unref(getShowMenu),
          },
        ];
      });
      return {
        prefixCls: getPrefixCls('default-layout'),
        getShowFullHeaderRef,
        isMobile,
        getIsMixSidebar,
        getShowSidebar,
        layoutClass,
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
