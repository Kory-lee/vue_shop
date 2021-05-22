<template>
  <div class="scrollbar">
    <div ref="wrap" :style="wrapStyle">
      <component :is="tag" ref="resize" :class="['scrollbar__view']" />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, provide, ref, defineComponent } from 'vue-demi';

  export default defineComponent({
    name: 'Scrollbar',
    props: {
      native: { type: Boolean, default: scrollbar?.native ?? false },
      wrapStyle: { type: Object, default: () => ({}) },
      tag: { type: String, default: 'div' },
    },
    setup(props) {
      const sizeWidth = ref('0');
      const sizeHeight = ref('0');
      const moveX = ref(0);
      const moveY = ref(0);
      const wrap = ref();
      const resize = ref(null);

      provide('scroll-bar-wrap', wrap);

      return { resize };
    },
  });
</script>

<style scoped></style>
