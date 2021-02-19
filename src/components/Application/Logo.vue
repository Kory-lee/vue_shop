<template>
  <div
    class="anticon"
    :class="[theme, prefixCls, { 'collapsed-show-title': getCollapsedShowTitle }]"
    @click="handleGoHome"
  >
    <img :src="LogoImg" alt="" />
    <div class="ml-2 ellipsis" :class="`${prefixCls}__title`" v-show="showTitle"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { useProviderContext } from './Provider/useAppContext';
  import { PageEnum } from '/@/enums/pageEnum';
  import { getCollapsedShowTitle } from '/@/hooks/setting/menuSetting';
  import { useGo } from '/@/hooks/web/usePage';
  import LogoImg from '/@/assets/img/logo.png';
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
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('app-logo');
      return { prefixCls, handleGoHome, getCollapsedShowTitle, LogoImg };
    },
  });
</script>

<style lang="less" scoped></style>
