<template>
  <div :class="[prefixCls, getLayoutContentMode]">
    <transition name="fade">
      <Loading
        v-if="getOpenPageLoading"
        :loading="getPageLoading"
        background="rgba(240,242,245,0.6)"
        absolute
        :class="`${prefixCls}-loading`"
      />
    </transition>
  </div>
  <PageLayout />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { getLayoutContentMode, getPageLoading } from '/@/hooks/setting/RootSetting';
import { getOpenPageLoading } from '/@/hooks/setting/TransitionSetting';
import PageLayout from '/@/layouts/page';
import Loading from '/@/components/Loading';
import { getPrefixCls as customizePrefixCls } from '/@/components/Application';

export default defineComponent({
  name: 'LayoutContent',
  components: { PageLayout, Loading },
  setup() {
    const getPrefixCls = inject('getPrefixCls', customizePrefixCls);
    return {
      prefixCls: getPrefixCls('layout-content'),
      getOpenPageLoading,
      getPageLoading,
      getLayoutContentMode,
    };
  },
});
</script>

<style></style>
