import type { EChartsOption } from 'echarts';
import { ref, Ref, unref } from '@vue/reactivity';
import useEventListener from '../event/useEventListener';
import useBreakPoint from '../event/useBreakPoint';
import echarts from '/@/plugins/echarts';
import { useTimeoutFn } from '../core/useTimeout';
import { computed, nextTick, watch } from '@vue/runtime-core';
import { tryOnUnmounted, useDebounceFn } from '@vueuse/core';
import { getCollapsed } from '../setting/useMenuSetting';

export default function useEcharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'light'
) {
  let chartInstance: echarts.ECharts | null = null,
    resizeFn: Fn = resize,
    removeResizeFn: Fn = () => {};

  const cacheOptions = ref<EChartsOption>({});

  resizeFn = useDebounceFn(resize, 200);

  const getOptions = computed(
    (): EChartsOption => {
      // if(getDarkMode)
      return { backgroundColor: 'transparent' };
    }
  );

  function initCharts(t = theme) {
    const el = unref(elRef);
    if (!el) return;

    chartInstance = echarts.init(el, t);
    const { removeEvent } = useEventListener({ el: window, name: 'resize', listener: resizeFn });

    removeResizeFn = removeEvent;

    const { widthRef, screenEnum } = useBreakPoint();
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0)
      useTimeoutFn(() => resizeFn(), 30);
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options;
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => setOptions(unref(getOptions)), 30);
      return;
    }
    nextTick(() =>
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts();
          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();

        chartInstance?.setOption(unref(getOptions));
      }, 30)
    );
  }

  function resize() {
    chartInstance?.resize();
  }
  watch(getCollapsed, () => resizeFn());

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  return {
    setOptions,
    resize,
    echarts,
  };
}
