<template>
  <Header :class="headerCls">
    <div :class="`${prefixCls}-left`">
      <Logo
        v-if="getShowHeaderLogo || isMobile"
        :class="`${prefixCls}-logo`"
        :theme="getHeaderTheme"
        :style="logoWidth"
      />
      <LayoutTrigger
        v-if="(getShowContent && getShowHeaderTrigger && !getSplit && !getIsMixSidebar) || isMobile"
        :theme="getHeaderTheme"
        :sidebar="false"
      />
      <LayoutBreadcrumb v-if="getShowContent && getShowBreadCrumb" :theme="getHeaderTheme" />
    </div>

    <div :class="`${prefixCls}-menu`"></div>

    <div :class="`${prefixCls}-action`">
      <ErrorAction v-if="getUseErrorHandle" :class="`${prefixCls}-action__item error-action`" />

      <Notify v-if="getShowNotice" :class="`${prefixCls}-action__item notify-item`" />

      <LocalePicker
        v-if="getShowLocalePicker"
        :reload="true"
        :show-text="false"
        :class="`${prefixCls}-action__item`"
      />
      <UserDropdown :theme="getHeaderTheme" />
    </div>
  </Header>
</template>

<script lang="ts">
  import { Layout } from 'ant-design-vue';
  import { computed, defineComponent, unref } from 'vue';
  import LayoutTrigger from '../trigger/index.vue';
  import LayoutBreadcrumb from './components/Breadcrumb.vue';
  import { Notify, ErrorAction } from './components';
  import UserDropdown from './components/UserDropdown/index.vue';
  import { Logo, LocalePicker } from '/@/components/Application';
  import { useProviderContext } from '/@/components/Application';
  import {
    getHeaderTheme,
    getShowContent,
    getShowHeaderLogo,
    getShowNotice,
  } from '/@/hooks/setting/useHeaderSetting';
  import {
    getIsMixMode,
    getIsMixSidebar,
    getMenuWidth,
    getShowHeaderTrigger,
    getSplit,
  } from '/@/hooks/setting/useMenuSetting';
  import { getShowBreadCrumb, getUseErrorHandle } from '/@/hooks/setting/useRootSetting';
  import { getShowLocalePicker } from '/@/hooks/setting/useLocaleSetting';

  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      ErrorAction,
      Header: Layout.Header,
      Logo,
      LayoutTrigger,
      LayoutBreadcrumb,
      LocalePicker,
      UserDropdown,
      Notify,
    },
    props: { fixed: Boolean },
    setup(props) {
      const { isMobile, getPrefixCls } = useProviderContext();
      const prefixCls = getPrefixCls('layout-header'),
        headerCls = computed(() => {
          const theme = unref(getHeaderTheme);
          return [
            prefixCls,
            {
              [`${prefixCls}--fixed`]: props.fixed,
              [`${prefixCls}--mobile`]: unref(isMobile),
              [`${prefixCls}--${theme}`]: theme,
            },
          ];
        }),
        logoWidth = computed(() => {
          if (!unref(getIsMixMode) || unref(isMobile)) return {};
          const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth);
          return { width: `${width}px` };
        });

      return {
        isMobile,
        prefixCls,
        headerCls,
        logoWidth,
        getShowHeaderLogo,
        getHeaderTheme,
        getShowContent,
        getShowHeaderTrigger,
        getSplit,
        getIsMixSidebar,
        getShowBreadCrumb,
        getShowLocalePicker,
        getUseErrorHandle,
        getShowNotice,
      };
    },
  });
</script>

<style lang="less">
  @import './index.less';
</style>
