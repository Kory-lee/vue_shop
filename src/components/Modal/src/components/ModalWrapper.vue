<template>
  <ScrollContainer ref="wrapperRef">
    <div ref="spinRef" v-loading="loading" :loading-tip="loadingTip" :style="spinStyle">
      <slot></slot>
    </div>
  </ScrollContainer>
</template>

<script lang="ts">
  import type { ModalWrapperProps } from '../types';

  import { CSSProperties, defineComponent, ref, unref } from 'vue';
  import ScrollContainer from '/@/components/Container/src/ScrollContainer.vue';
  import useWindowSizeFn from '/@/hooks/event/useWindowSizeFn';
  import { computed, nextTick, onMounted, watch, watchEffect } from 'vue-demi';
  import { isFunction } from '/@/utils/is';
  import { error } from '/@/utils/log';

  export default defineComponent({
    name: 'ModalWrapper',
    components: { ScrollContainer },
    inheritAttrs: false,
    props: {
      loading: Boolean,
      useWrapper: { type: Boolean, default: true },
      modalHeaderHeight: { type: Number, default: 57 },
      modalFooterHeight: { type: Number, default: 74 },
      minHeight: { type: Number, default: 200 },
      height: Number,
      footerOffset: { type: Number, default: 0 },
      visible: Boolean,
      fullscreen: Boolean,
      loadingTip: String,
    },
    emits: ['height-change', 'ext-height'],
    setup(props: ModalWrapperProps, { emit }) {
      const wrapperRef = ref<ComponentRef>(null);
      const spinRef = ref<ElRef>(null);
      const realHeightRef = ref(0);
      const minRealHeightRef = ref(0);

      const spinStyle = computed(
        (): CSSProperties => ({
          minHeight: `${props.minHeight}px`,
          height: `${unref(realHeightRef)}px`,
        })
      );
      let realHeight,
        stopElResizeFn: Fn = () => {};

      useWindowSizeFn(setModalHeight.bind(null, false));

      watchEffect(() => {
        props.useWrapper && setModalHeight();
      });
      watch(
        () => props.fullscreen,
        (v) => {
          setModalHeight();
          if (v) minRealHeightRef.value = unref(realHeightRef);
          else minRealHeightRef.value = unref(realHeightRef);
        }
      );

      onMounted(() => isFunction(stopElResizeFn) && stopElResizeFn());

      async function scrollTop() {
        await nextTick();
        const wrapperRefDom = unref(wrapperRef);
        if (!wrapperRefDom) return;
        wrapperRefDom?.scrollTo?.(0);
      }

      async function setModalHeight() {
        // 解决在弹窗关闭的时候监听还存在,导致再次打开弹窗没有高度
        // 加上这个,就必须在使用的时候传递父级的visible
        if (!props.visible) return;
        const wrapperRefDom = unref(wrapperRef);
        if (!wrapperRefDom) return;

        const bodyDom = wrapperRefDom.$el.parentElement;
        if (!bodyDom) return;
        bodyDom.style.padding = '0';
        await nextTick();
        try {
          const modalDom = bodyDom.parentElement && bodyDom.parentElement.parentElement;
          if (!modalDom) return;

          const modalTop = Number.parseInt(getComputedStyle(modalDom).top);
          let maxHeight =
            window.innerHeight -
            modalTop * 2 +
            (props.footerOffset || 0) -
            props.modalFooterHeight -
            props.modalHeaderHeight;
          //距离顶部过度会出现滚动条
          if (modalTop < 40) maxHeight -= 26;

          const spinEl = unref(spinRef);
          if (!spinEl) return;
          await nextTick();
          realHeight = spinEl.scrollHeight;
          if (props.fullscreen)
            realHeightRef.value =
              window.innerHeight - props.modalHeaderHeight - props.modalFooterHeight - 28;
          else
            realHeightRef.value = props.height
              ? props.height
              : realHeight > maxHeight
              ? maxHeight
              : realHeight;
          emit('height-change', unref(realHeightRef));
        } catch (e) {
          error(e);
        }
      }

      return { spinRef, wrapperRef, spinStyle, scrollTop, setModalHeight };
    },
  });
</script>
