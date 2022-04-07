<template>
  <Input v-bind="$attrs" :class="prefixCls" :size="size">
    <template #addonAfter>
      <CountButton :size="size" :count="count" :before-start-func="sendCodeApi" />
    </template>
  </Input>
</template>

<script lang="ts">
  import type { PropType } from 'vue';

  import { Input } from 'ant-design-vue';
  import CountButton from './CountButton.vue';
  import { useProviderContext } from '../../Application';
  import { defineComponent } from 'vue-demi';

  export default defineComponent({
    name: 'CountDownInput',
    components: { CountButton, Input },
    props: {
      value: String,
      size: { type: String as PropType<'default' | 'large' | 'small'>, default: 'default' },
      count: { type: Number, default: 60 },
      sendCodeApi: {
        type: Function as PropType<() => boolean>,
        default: null,
      },
    },
    setup() {
      const { getPrefixCls } = useProviderContext();

      return { prefixCls: getPrefixCls('countdown-input') };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-countdown-input';

  .@{prefix-cls} {
    .ant-input-group-addon {
      padding-right: 0;
      background-color: transparent;
      border: none;

      button {
        font-size: 14px;
      }
    }
  }
</style>
