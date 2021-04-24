<template>
  <div :class="[`${prefixCls}__header px-2 py-5`, $attrs.class]">
    <div :class="`${prefixCls}__action`">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'CollapseHeader',
    components: {},
    inheritAttrs: false,
    props: {
      prefixCls: { type: String, default: '' },
      helpMessage: { type: String, default: '' },
      title: { type: String, default: '' },
      show: Boolean,
      canExpand: Boolean,
    },
    emits: ['expand'],
  });
</script>
