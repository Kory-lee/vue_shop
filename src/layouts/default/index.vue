<template>
  <Layout :class="prefixCls">
    <LayoutFeature />
    <LayoutHeader fixed v-if="!getShowFullHeaderRef" />
    <Layout>
      <LayoutSidebar />
      <Layout>
        <LayoutContent />
        <LayoutFooter />
      </Layout>
    </Layout>
  </Layout>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { Layout } from 'ant-design-vue';
import LayoutSidebar from './sidebar/index.vue';
import LayoutHeader from './header/index.vue';
import LayoutContent from './content.vue';
import { getPrefixCls as customizePrefixCls } from '/@/components/Application';
import createAsyncComponent from '/@/utils/factory/createAsyncComponent';
import { getShowFullHeaderRef } from '/@/hooks/setting/headerSetting';
export default defineComponent({
  components: {
    LayoutFeature: createAsyncComponent(() => import('./feature.vue')),
    LayoutFooter: createAsyncComponent(() => import('./footer.vue')),
    LayoutContent,
    LayoutHeader,
    LayoutSidebar,
    Layout,
  },
  setup() {
    const isMobile = inject('isMobile');
    const getPrefixCls = inject('getPrefixCls', customizePrefixCls);
    console.log(getShowFullHeaderRef);

    return {
      prefixCls: getPrefixCls('default-layout'),
      getShowFullHeaderRef,
    };
  },
});
</script>

<style lang="less">
@import (reference) '../../styles/index.less';
@prefix-cls: ~'@{namespace}-default-layout';
.@{prefix-cls}{
  display: flex;
  width: 100%;
  min-height: 100%;
  background: @content-bg;
  flex-direction: column;
  > .ant-layout{
    min-height: 100%;
  }
  &__main{
    margin-left: 1px;
  }
}
</style>
