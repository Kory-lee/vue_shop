import { computed, ComputedRef, ref, unref } from 'vue';
import { eventListener } from './eventListener';
import { screenEnum, screenMap, sizeEnum } from '/@/enums/breakpointEnum';

let globalScreenRef: ComputedRef<sizeEnum | undefined>,
  globalWidthRef: ComputedRef<number>,
  globalRealWidthRef: ComputedRef<number>;
export interface CreateCallbackParams {
  screen: ComputedRef<sizeEnum | undefined>;
  width: ComputedRef<number>;
  realWidth: ComputedRef<number>;
  screenEnum: typeof screenEnum;
  screenMap: Map<sizeEnum, number>;
  sizeEnum: typeof sizeEnum;
}

export function createBreakpointListen(fn?: (opt: CreateCallbackParams) => void) {
  const screenRef = ref(sizeEnum.XL);
  const realWidthRef = ref(window.innerWidth);

  function getWindowWidth() {
    const width = document.body.clientWidth,
      xs = screenMap.get(sizeEnum.XS)!,
      sm = screenMap.get(sizeEnum.SM)!,
      md = screenMap.get(sizeEnum.MD)!,
      lg = screenMap.get(sizeEnum.LG)!,
      xl = screenMap.get(sizeEnum.XL)!;
    if (width < xs) screenRef.value = sizeEnum.XS;
    else if (width < sm) screenRef.value = sizeEnum.SM;
    else if (width < md) screenRef.value = sizeEnum.MD;
    else if (width < lg) screenRef.value = sizeEnum.LG;
    else if (width < xl) screenRef.value = sizeEnum.XL;
    else screenRef.value = sizeEnum.XXL;

    realWidthRef.value = width;
  }
  eventListener({
    el: window,
    name: 'resize',
    listener: () => {
      getWindowWidth();
      resizeFn();
    },
  });
  getWindowWidth();

  globalScreenRef = computed(() => unref(screenRef));
  globalWidthRef = computed((): number => screenMap.get(unref(screenRef)!)!);
  globalRealWidthRef = computed((): number => unref(realWidthRef));

  function resizeFn() {
    fn?.({
      screen: globalScreenRef,
      width: globalWidthRef,
      realWidth: globalRealWidthRef,
      screenEnum,
      screenMap,
      sizeEnum,
    });
  }
  resizeFn();
  return { screenEnum };
}
