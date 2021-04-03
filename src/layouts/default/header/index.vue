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
      <!-- <LocalePicker v-if="getShowLocalPicker" /> -->
    </div>
  </Header>
</template>

<script lang="ts">
  import { Layout } from 'ant-design-vue';
  import { computed, defineComponent, unref } from 'vue';
  import LayoutTrigger from '../trigger/index.vue';
  import LayoutBreadcrumb from './components/Breadcrumb.vue';
  import { Logo, LocalePicker } from '/@/components/Application';
  import { useProviderContext } from '/@/components/Application';
  import {
    getHeaderTheme,
    getShowContent,
    getShowHeaderLogo,
  } from '/@/hooks/setting/useHeaderSetting';
  import { getShowLocale } from '/@/hooks/setting/useLocaleSetting';
  import {
    getIsMixMode,
    getIsMixSidebar,
    getMenuWidth,
    getShowHeaderTrigger,
    getSplit,
  } from '/@/hooks/setting/useMenuSetting';
  import { getShowBreadCrumb } from '/@/hooks/setting/useRootSetting';

  export default defineComponent({
    name: 'LayoutHeader',
    components: { Header: Layout.Header, Logo, LayoutTrigger, LayoutBreadcrumb, LocalePicker },
    props: { fixed: Boolean },
    setup(props) {
      const { isMobile, getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('layout-header'),
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
          if (!unref(getIsMixMode)) return {};
          const width = unref(getMenuWidth) < 180 ? 180 : unref(getMenuWidth);
          return { width: `${width}px` };
        });

      return {
        isMobile,
        prefixCls,
        getShowLocale,
        headerCls,
        logoWidth,
        getShowHeaderLogo,
        getHeaderTheme,
        getShowContent,
        getShowHeaderTrigger,
        getSplit,
        getIsMixSidebar,
        getShowBreadCrumb,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import './index';
</style>
