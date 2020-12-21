<template>
  <div class="anticon" :class="[theme, prefixCls]" @click="handleGoHome">
    <img src="/@/assets/img/logo.png" alt="" />
    <div class="ml-2 ellipsis" :class="`${prefixCls}__title`" v-show="showTitle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import { getPrefixCls as customizePrefixCls } from '/@/components/Application';
import { PageEnum } from '/@/enums/pageEnum';
import { useGo } from '/@/hooks/web/usePage';
// import {getCollapsedShowTitle}
export default defineComponent({
  name: 'Logo',
  props: {
    theme: { type: String as PropType<'light' | 'dark'> },
    showTitle: { type: Boolean, default: true },
  },
  setup() {
    const go = useGo();
    const handleGoHome = () => go(PageEnum.BASE_HOME);
    const getPrefixCls = inject('getPrefixCls', customizePrefixCls);
    const prefixCls = getPrefixCls('app-logo');
    return { prefixCls, handleGoHome };
  },
});
</script>

<style lang="less" scoped></style>
