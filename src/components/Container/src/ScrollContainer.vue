<template>
  <Scrollbar ref="scrollbarRef" class="scroll-container" v-bind="$attrs">
    <slot></slot>
  </Scrollbar>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue-demi';
  import { Scrollbar, ScrollbarType } from '../../Scrollbar';

  export default defineComponent({
    name: 'ScrollContainer',
    components: { Scrollbar },
    setup() {
      const scrollbarRef = ref<ScrollbarType | null>(null);

      function getScrollWrap() {
        const scrollbar = ref(scrollbarRef);
        if (!scrollbar) return null;
        return scrollbar.wrap;
      }
      return { scrollbarRef, getScrollWrap };
    },
  });
</script>

<style lang="less"></style>
