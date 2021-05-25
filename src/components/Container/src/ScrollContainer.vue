<template>
  <Scrollbar ref="scrollbarRef" class="scroll-container" v-bind="$attrs">
    <slot></slot>
  </Scrollbar>
</template>

<script lang="ts">
  import { defineComponent, nextTick, ref, unref } from 'vue-demi';
  import { Scrollbar, ScrollbarType } from '../../Scrollbar';
  import { useScrollTo } from '/@/hooks/event/useScrollTo';

  export default defineComponent({
    name: 'ScrollContainer',
    components: { Scrollbar },
    setup() {
      const scrollbarRef = ref<ScrollbarType | null>(null);

      function scrollTo(to: number, duration = 500) {
        const wrap = getScrollWrap();
        if (!wrap) return;
        nextTick(() => {
          const { start } = useScrollTo({
            el: wrap,
            to,
            duration,
          });
          start();
        });
      }

      function scrollBottom() {
        const wrap = getScrollWrap();
        if (!wrap) return;
        const scrollHeight = wrap.scrollHeight;
        scrollTo(scrollHeight);
      }

      function getScrollWrap() {
        const scrollbar = unref(scrollbarRef);
        if (!scrollbar) return null;
        return scrollbar.wrap;
      }

      return { scrollbarRef, getScrollWrap, scrollBottom, scrollTo };
    },
  });
</script>

<style lang="less">
  .scroll-container {
    width: 100%;
    height: 100%;

    .scrollbar__wrap {
      margin-bottom: 18px !important;
      overflow-x: hidden;
    }

    .scrollbar__view {
      box-sizing: border-box;
    }
  }
</style>
