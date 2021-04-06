<template>
  <div
    class="anticon"
    :class="[theme, prefixCls, { 'collapsed-show-title': getCollapsedShowTitle }]"
    @click="handleGoHome"
  >
    <img :src="LogoImg" alt="logo" />
    <div
      v-show="showTitle"
      class="ml-2 truncate md:opacity-100"
      :class="[`${prefixCls}__title`, { '-sm:opacity-0': !alwaysShowTitle }]"
    >
      {{ title }}
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { useProviderContext } from './Provider/useAppContext';
  import LogoImg from '/@/assets/img/logo.png';
  import { PageEnum } from '/@/enums/PageEnum';
  import { useGlobalSetting } from '/@/hooks/setting';
  import { getCollapsedShowTitle } from '/@/hooks/setting/useMenuSetting';
  import { useGo } from '/@/hooks/web/usePage';
  export default defineComponent({
    name: 'Logo',
    props: {
      theme: { type: String as PropType<'light' | 'dark'>, default: 'dark' },
      showTitle: { type: Boolean, default: true },
      alwaysShowTitle: { type: Boolean, default: false },
    },
    setup() {
      const go = useGo();
      const handleGoHome = () => go(PageEnum.BASE_HOME);
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('app-logo'),
        { title } = useGlobalSetting();
      return { prefixCls, handleGoHome, getCollapsedShowTitle, LogoImg, title };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-logo';

  .@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;

    &.light {
      border-bottom: 1px solid @border-color-base;
    }

    &.collapsed-show-title {
      padding-left: 20px;
    }

    &.light &__title {
      color: @primary-color;
    }

    &.dark &__title {
      color: @white;
    }

    &__title {
      font-size: 16px;
      font-weight: 700;
      transition: all 0.5s;
    }
  }
</style>
