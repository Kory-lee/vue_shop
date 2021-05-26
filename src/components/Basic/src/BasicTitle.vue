<template>
  <span :class="getClass">
    <slot></slot>
    <BasicHelp v-if="helpMessage" :text="helpMessage" :class="`${prefixCls}__help`" />
  </span>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType } from '@vue/runtime-core';
  import { useProviderContext } from '../../Application';
  import BasicHelp from './BasicHelp.vue';

  export default defineComponent({
    name: 'BasicTitle',
    components: { BasicHelp },
    props: {
      helpMessage: { type: [String, Array] as PropType<string | string[]>, default: '' },
      span: Boolean,
      normal: Boolean,
    },
    setup(props, { slots }) {
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('basic-title');

      const getClass = computed(() => [
        prefixCls,
        {
          [`${prefixCls}-show-span`]: props.span && slots.default,
          [`${prefixCls}-normal`]: props.normal,
        },
      ]);
      return { getClass, prefixCls };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-basic-title';

  .@{prefix-cls} {
    position: relative;
    display: flex;
    padding-left: 7px;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: @text-color-base;
    cursor: pointer;
    user-select: none;

    &--normal {
      font-size: 14px;
      font-weight: 500;
    }
  }
</style>
