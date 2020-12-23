<template>
  <div :class="[prefixCls, `${prefixCls}--${theme}`]"></div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import { getPrefixCls as customizePrefixCls } from '/@/components/Application';
export default defineComponent({
  name: 'LayoutBreadcrumb',
  props: { theme: String as PropType<'light' | 'dark'> },
  setup() {
    const getPrefixCls = inject('getPrefixCls', customizePrefixCls);
    return { prefixCls: getPrefixCls('layout-breadcrumb') };
  },
});
</script>

<style></style>
