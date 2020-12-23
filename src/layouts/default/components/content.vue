<template>
  <div :class="[getLayoutContentMode]">
    <transition name="fade">
      <Loading
        v-if="getOpenPageLoading"
        :loading="getPageLoading"
        background="rgba(240,242,245,0.6)"
        absolute
        :class="`-loading`"
      />
    </transition>
  </div>
  <PageLayout />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getLayoutContentMode, getPageLoading } from '/@/hooks/setting/RootSetting';
import { getOpenPageLoading } from '/@/hooks/setting/TransitionSetting';
import PageLayout from '/@/layouts/page';
import Loading from '/@/components/Loading';

export default defineComponent({
  name: 'LayoutContent',
  components: { PageLayout, Loading },
  setup() {
    // const { getOpenPageLoading } = useTransitionSetting();
    // TODO prefixClass
    // const { getLayoutContentMode, getPageLoading } = useRootSetting();
    return { getOpenPageLoading, getPageLoading, getLayoutContentMode };
  },
});
</script>

<style></style>
