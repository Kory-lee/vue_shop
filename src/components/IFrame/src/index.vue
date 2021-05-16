<template>
  <div :class="prefixCls" :style="getWrapStyle">
    <Spin :spinning="loading" size="large" :style="getWrapStyle">
      <iframe ref="frameRef" :class="`${prefixCls}__main`" :src="frameSrc"></iframe>
    </Spin>
  </div>
</template>

<script lang="ts">
  import type { CSSProperties } from 'vue';

  import { computed, defineComponent, onMounted, ref, unref } from 'vue-demi';
  import { useProviderContext } from '../../Application';
  import useWindowSizeFn from '/@/hooks/event/useWindowSizeFn';
  import { Spin } from 'ant-design-vue';
  import { getViewportOffset } from '/@/utils/dom';
  import { nextTick } from 'vue';

  export default defineComponent({
    name: 'IFrame',
    components: { Spin },
    props: {
      frameSrc: { type: String, default: '' },
    },
    setup() {
      const loading = ref(false),
        topRef = ref(50),
        heightRef = ref(window.innerHeight),
        frameRef = ref<HTMLFrameElement | null>(null);
      const getWrapStyle = computed((): CSSProperties => ({ height: `${unref(heightRef)}px` }));

      const { getPrefixCls } = useProviderContext();

      useWindowSizeFn(calcHeight, 150, { immediate: true });
      function calcHeight() {
        const iframe = unref(frameRef);
        if (!iframe) return;

        let { top } = getViewportOffset(iframe);
        topRef.value = top;
        heightRef.value = window.innerHeight - top;
        const clientHeight = document.documentElement.clientHeight - top;
        iframe.style.height = `${clientHeight}px`;
      }

      function hideLoading() {
        loading.value = false;
        calcHeight();
      }

      function init() {
        nextTick(() => {
          const iframe = unref(frameRef);
          if (!iframe) return;
          const _frame = iframe as any;
          if (_frame.attachEvent) {
            _frame.attachEvent('onload', () => {
              hideLoading();
            });
          } else {
            iframe.onload = () => {
              hideLoading();
            };
          }
        });
      }
      onMounted(() => {
        loading.value = true;
        init();
      });
      return {
        prefixCls: getPrefixCls('iframe-page'),
        getWrapStyle,
        loading,
        frameRef,
      };
    },
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-iframe-page';

  .@{prefix-cls} {
    .ant-spin-nested-loading {
      position: relative;
      height: 100%;

      .ant-spin-container {
        width: 100%;
        height: 100%;
        padding: 10px;
      }
    }
    &__mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &__main {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: @component-background;
      border: 0;
      box-sizing: border-box;
    }
  }
</style>
