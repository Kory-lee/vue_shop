<template>
  <div :class="prefixCls">
    <div v-if="$slots.header" :class="`${prefixCls}__header`">
      <slot name="header" />
    </div>
    <div v-else :class="`${prefixCls}__header px-2 py-4`">
      <div :class="`${prefixCls}__action`">
        <slot name="action"></slot>
      </div>
    </div>

    <div class="p-2">
      <Skeleton v-if="loading" :active="active" />
      <div v-else v-show="show" :class="`${prefixCls}__body`">
        <slot />
      </div>
    </div>
    <div v-if="$slots.footer" :class="`${prefixCls}__footer`">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue';
  import { useTimeoutFn } from '@vueuse/core';
  import { useProviderContext } from '/@/components/Application';
  import { triggerWindowResize } from '/@/utils/event';
  import { Skeleton } from 'ant-design-vue';

  export default defineComponent({
    name: 'CollapseContainer',
    components: { Skeleton },
    props: {
      title: { type: String, default: '' },
      canExpand: { type: Boolean, default: true },
      helpMessage: { type: [Array, String] as PropType<string[] | string>, default: '' },
      triggerWindowResize: Boolean,
      loading: { type: Boolean, default: false },
      active: { type: Boolean, default: true },
      lazyTime: { type: Number, default: 0 },
    },
    setup(props) {
      const show = ref(true);
      const { getPrefixCls } = useProviderContext(),
        prefixCls = getPrefixCls('collapse-container');

      function handleExpand() {
        show.value = !show.value;
        if (props.triggerWindowResize) useTimeoutFn(triggerWindowResize, 200);
      }

      return { show, prefixCls, handleExpand };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-collapse-container';

  .@{prefix-cls} {
    background-color: @component-background;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;

    &__header {
      display: flex;
      height: 32px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid @border-color-light;
    }

    &__footer {
      border-top: 1px solid @border-color-light;
    }

    &__action {
      display: flex;
      text-align: right;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
    }
  }
</style>
