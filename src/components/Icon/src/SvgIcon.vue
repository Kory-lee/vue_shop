<template>
  <svg
    :class="[prefixCls, spin && 'svg-icon-spin']"
    v-bind="$attrs"
    :style="getStyle"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
  import type { CSSProperties } from 'vue';

  import { useProviderContext } from '../../Application';
  import { computed, defineComponent } from 'vue-demi';

  export default defineComponent({
    name: 'SvgIcon',
    inheritAttrs: false,
    props: {
      prefix: { type: String, default: 'icon' },
      name: { type: String, default: '' },
      size: { type: [Number, String], default: 16 },
      spin: Boolean,
    },
    setup(props) {
      const { getPrefixCls } = useProviderContext();
      const symbolId = computed(() => `#${props.prefix}-${props.name}`);

      const getStyle = computed((): CSSProperties => {
        let s = `${props.size}`;
        s = `${s.replace('px', '')}px`;
        return {
          width: s,
          height: s,
        };
      });

      return { prefixCls: getPrefixCls('svg-icon'), getStyle, symbolId };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-svg-icon';

  .@{prefix-cls} {
    display: inline-block;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
  }
  .svg-icon-spin {
    animation: loadingCircle 1s infinite linear;
  }
</style>
