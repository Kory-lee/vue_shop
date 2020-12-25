<template>
  <Header :class="headerCls">
    <div :class="`${prefixCls}-left`">
      <Logo
        v-if="getShowHeaderLogo"
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
    <div :class="`${prefixCls}-action`"></div>
  </Header>
</template>

<script lang="ts">
import { computed, defineComponent, inject, unref } from 'vue';
import { getPrefixCls as customizePrefixCls } from '/@/components/Application/Provider';
import { Layout } from 'ant-design-vue';
import { Logo } from '/@/components/Application';
import { getShowLocale } from '/@/hooks/setting/LocaleSetting';
import { getHeaderTheme, getShowContent, getShowHeaderLogo } from '/@/hooks/setting/headerSetting';
import {
  getIsMixMode,
  getMenuWidth,
  getShowHeaderTrigger,
  getSplit,
  getIsMixSidebar,
} from '/@/hooks/setting/menuSetting';
import LayoutTrigger from '../trigger/index.vue';
import LayoutBreadcrumb from './components/Breadcrumb.vue';
import { getShowBreadCrumb } from '/@/hooks/setting/RootSetting';
export default defineComponent({
  name: 'LayoutHeader',
  components: { Header: Layout.Header, Logo, LayoutTrigger, LayoutBreadcrumb },
  props: { fixed: Boolean },
  setup(props) {
    const getPrefixCls = inject('getPrefixCls', customizePrefixCls),
      prefixCls = getPrefixCls('layout-header');
    const isMobile = inject('isMobile'),
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

<style lang="less">
@header-prefix-cls: ~'@{namespace}-layout-header';

.@{header-prefix-cls}{
  display: flex;
  padding: 0;
  margin-left: -1px;
}
</style>
