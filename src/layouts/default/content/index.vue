<template>
  <div v-loading="getOpenPageLoading && getPageLoading" :class="[prefixCls, getLayoutContentMode]">
    <PageLayout />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useContentViewHeight } from './useContentViewHeight';
  import { useProviderContext } from '/@/components/Application';
  import { getLayoutContentMode, getPageLoading } from '/@/hooks/setting/useRootSetting';
  import { getOpenPageLoading } from '/@/hooks/setting/useTransitionSetting';
  import PageLayout from '/@/layouts/page/index.vue';

  export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout },
    setup() {
      const { getPrefixCls } = useProviderContext();
      useContentViewHeight();

      return {
        prefixCls: getPrefixCls('layout-content'),
        getOpenPageLoading,
        getPageLoading,
        getLayoutContentMode,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-content';

  .@{prefix-cls} {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;

    &.fixed {
      width: 1200px;
      margin: 0 auto;
    }
  }
</style>
