import type { EChartsOption } from 'echarts';
import { Ref, unref } from '@vue/reactivity';
import { useDebounce } from '../core/useDebounce';
import useEventListener from '../event/useEventListener';
import useBreakPoint from '../event/useBreakPoint';
import echarts from '/@/plugins/echarts';
import { useTimeoutFn } from '../core/useTimeout';
import { nextTick, watch } from '@vue/runtime-core';
import { tryOnUnmounted } from '@vueuse/core';
import { getCollapsed } from '../setting/useMenuSetting';

export default function useEcharts(
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'light'
) {
  let chartInstance: echarts.ECharts | null = null,
    resizeFn: Fn = resize,
    removeResizeFn: Fn = () => {};

  const [debounceResize] = useDebounce(resizeFn, 200);
  resizeFn = debounceResize;

  function initCharts() {
    const el = unref(elRef);
    if (!el) return;

    chartInstance = echarts.init(el, theme);
    const { removeEvent } = useEventListener({ el: window, name: 'resize', listener: resizeFn });

    removeResizeFn = removeEvent;

    const { widthRef, screenEnum } = useBreakPoint();
    if (unref(widthRef) <= screenEnum.MD || el.offsetHeight === 0)
      useTimeoutFn(() => resizeFn(), 30);
  }

  function setOptions(options: EChartsOption, clear = true) {
    if (unref(elRef)?.offsetHeight === 0) useTimeoutFn(() => setOptions(options), 30);
    nextTick(() =>
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts();
          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();

        chartInstance?.setOption(options);
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
