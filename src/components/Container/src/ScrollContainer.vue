<template>
  <Scrollbar ref="scrollbarRef" class="scroll-container" v-bind="$attrs">
    <slot></slot>
  </Scrollbar>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue-demi';
  import { Scrollbar, ScrollbarType } from '../../Scrollbar';

  export default defineComponent({
    name: 'ScrollContainer',
    components: { Scrollbar },
    setup() {
      const scrollbarRef = ref<ScrollbarType | null>(null);

      function getScrollWrap() {
        const scrollbar = unref(scrollbarRef);
        if (!scrollbar) return null;
        return scrollbar.wrap;
      }
      return { scrollbarRef, getScrollWrap };
    },
  });
</script>

<style lang="less">
  .scroll-container {
    width: 100%;
    height: 100%;

    .scrollbar__wrap {
      margin-bottom: 18px o !important;
      overflow-x: hidden;
    }

    .scrollbar__view {
      box-sizing: border-box;
    }
  }
</style>
