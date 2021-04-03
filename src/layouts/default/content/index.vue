<template>
  <div :class="[prefixCls, getLayoutContentMode]">
    <transition name="fade">
      <Loading
        v-if="getOpenPageLoading"
        :loading="getPageLoading"
        background="rgba(240, 242, 245, 0.6)"
        absolute
        :class="`${prefixCls}-loading`"
      />
    </transition>
    <PageLayout />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useProviderContext } from '/@/components/Application';
  import { Loading } from '/@/components/Loading';
  import { getLayoutContentMode, getPageLoading } from '../../../hooks/setting/useRootSetting';
  import { getOpenPageLoading } from '/@/hooks/setting/useTransitionSetting';
  import PageLayout from '/@/layouts/page/index.vue';

  export default defineComponent({
    name: 'LayoutContent',
    components: { PageLayout, Loading },
    setup() {
      const { getPrefixCls } = useProviderContext();
      return {
        prefixCls: getPrefixCls('layout-content'),
        getOpenPageLoading,
        getPageLoading,
        getLayoutContentMode,
      };
    },
  });
</script>

<style lang="less">
  @class: ~'@{namespace}-layout-content';

  .@{class} {
    position: relative;
    flex: 1 1 auto;
    min-height: 0;

    &.fixed {
      width: 1200px;
      margin: 0 auto;
    }
    &-loading {
      position: absolute;
      top: 200px;
      z-index: @page-loading-z-index;
    }
  }
</style>
