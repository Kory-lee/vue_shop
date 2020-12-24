<!--TODO 为什么用模板语法会报错呢-->
<template>
  <AFooter :class="prefixCls" v-if="getShowLayoutFooter">
    <div :class="`${prefixCls}__links`">
      <div>Copyright &copy;2020 Admin</div>
    </div>
  </AFooter>
</template>

<script lang="ts">
import { computed, defineComponent, h, inject, unref } from 'vue';
import { Layout } from 'ant-design-vue';
import { getPrefixCls as customizePrefixCls } from '/@/components/Application';
import { getShowFooter } from '/@/hooks/setting/RootSetting';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'LayoutFooter',
  components: { AFooter: Layout.Footer },
  setup() {
    const getPrefixCls = inject('getPrefixCls', customizePrefixCls);
    const { currentRoute } = useRouter(),
      getShowLayoutFooter = computed(
        () => unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter
      );

    return { prefixCls: getPrefixCls('layout-footer'), getShowLayoutFooter };
  },
});
</script>

<style lang="less">
@import (reference) '../../styles/index';

@class: ~'@{namespace}-layout-footer';
@normal-color: rgba(0,0,0,0.45);

@hover-color:rgba(0,0,0,0.85);
.@{class}{
  color: @normal-color;
  text-align: center;
  &__links{
    margin-bottom:8px;
    a{
      color: @normal-color;
      &:hover{
        color:@hover-color;
      }
    }
  }
  &__github{
    margin: 0 30px;

    &:hover{
      color: @hover-color;
    }
  }
}
</style>
