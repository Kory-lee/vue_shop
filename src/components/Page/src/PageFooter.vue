<template>
  <div :class="prefixCls" :style="{ width: getCalcContentWidth }">
    <div :class="`${prefixCls}__left`">
      <slot name="left"></slot>
    </div>
    <slot></slot>
    <div :class="`${prefixCls}__right`">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from '@vue/runtime-core';
  import { useProviderContext } from '../../Application';
  import { getCalcContentWidth } from '/@/hooks/setting/useMenuSetting';

  export default defineComponent({
    name: 'PageFooter',
    inheritAttrs: false,
    setup() {
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('page-footer');

      return { prefixCls, getCalcContentWidth };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-page-footer';

  .@{prefix-cls} {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: @page-footer-z-index;
    display: flex;
    width: 100%;
    align-items: center;
    padding: 0 24px;
    line-height: 44px;

    &__left {
      flex: 1 1;
    }
  }
</style>
