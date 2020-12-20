<template>
  <Header>
    <div :class="`${prefixCls}-left`">
      <Logo v-if="getShowHeaderLogo" />
    </div>
  </Header>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { getPrefixCls as customizePrefixCls } from '/@/components/Application/Provider';
import { Layout } from 'ant-design-vue';
import { Logo } from '/@/components/Application';
import { getShowLocale } from '/@/hooks/setting/LocaleSetting';
import { getShowHeaderLogo } from '/@/hooks/setting/headerSetting';
export default defineComponent({
  name: 'LayoutHeader',
  components: { Header: Layout.Header, Logo },
  setup() {
    const getPrefixCls = inject('getPrefixCls', customizePrefixCls);
    const prefixCls = getPrefixCls('layout-header');
    const isMobile = inject('isMobile');
    console.log('headerLogo', getShowHeaderLogo);

    return { prefixCls, getShowLocale, getShowHeaderLogo, isMobile };
  },
});
</script>

<style></style>
