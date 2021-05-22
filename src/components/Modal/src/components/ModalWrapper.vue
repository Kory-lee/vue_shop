<template>
  <ScrollContainer ref="wrapperRef">
    <div ref="spinRef" v-loading="loading">
      <slot></slot>
    </div>
  </ScrollContainer>
</template>

<script lang="ts">
  import type { ModalWrapperProps } from '../types';

  import { defineComponent, ref } from 'vue';
  import ScrollContainer from '/@/components/Container/src/ScrollContainer.vue';
  import useWindowSizeFn from '/@/hooks/event/useWindowSizeFn';

  export default defineComponent({
    name: 'ModalWrapper',
    components: { ScrollContainer },
    inheritAttrs: false,
    props: {
      loading: Boolean,
      useWrapper: { type: Boolean, default: true },
    },
    emits: ['height-change', 'ext-height'],
    setup(props: ModalWrapperProps) {
      const wrapperRef = ref<ComponentRef>(null);
      const spinRef = ref<ElRef>(null);
      const realHeightRef = ref(0);
      const minRealHeightRef = ref(0);

      let realHeight,
        stopElResizeFn: Fn = () => {};

      useWindowSizeFn(setModalHeight.bind(null, false));

      function setModalHeight() {
        // 解决在弹窗关闭的时候监听还存在,导致再次打开弹窗没有高度
        // 加上这个,就必须在使用的时候传递父级的visible
      }
      return { spinRef, wrapperRef };
    },
  });
</script>
