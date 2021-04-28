import { computed, nextTick, onMounted, ref, Ref, unref } from 'vue';
import { TriggerEnum } from '/@/enums/menuEnum';
import {
  getCollapsed,
  getMinWidthNumber,
  getSplit,
  getTrigger,
  setMenuSetting,
} from '/@/hooks/setting/useMenuSetting';
import {  useDebounceFn } from "@vueuse/core";

export function useSidebarEvent() {
  const brokenRef = ref(false),
    getCollapsedWidth = computed(() => (unref(brokenRef) ? 0 : unref(getMinWidthNumber)));

  function onBreakpointChange(broken: boolean) {
    brokenRef.value = broken;
  }

  return { getCollapsedWidth, onBreakpointChange };
}

export function useTrigger(isMobile: Ref<boolean>) {
  const getShowTrigger = computed(() => {
      const trigger = unref(getTrigger);

      return (
        trigger !== TriggerEnum.NONE &&
        !unref(isMobile) &&
        (trigger === TriggerEnum.FOOTER || unref(getSplit))
      );
    }),
    getTriggerAttr = computed(() => {
      if (unref(getShowTrigger)) return {};
      return { trigger: null };
    });
  return { getShowTrigger, getTriggerAttr };
}

export function createDragLine(sidebarRef: Ref<any>, dragBarRef: Ref<any>, mix = false) {
  onMounted(() =>
    nextTick(() => {
      const exec = useDebounceFn(changeWrapWidth, 80);
      exec();
    })
  );
  function getEl(elRef: Ref<ElRef | ComponentRef>): any {
    const el = unref(elRef);
    if (!el) return null;

    if (Reflect.has(el, '$el')) return (el as ComponentElRef)?.$el;
    return el;
  }

  function handleMouseMove(el: HTMLElement, wrap: HTMLElement, clientX: number) {
    document.onmousemove = function (innerE) {
      let iT: number = (el as any).left + (innerE.clientX - clientX);
      const maxT = 800,
        minT = unref(getMinWidthNumber);
      if (iT < 0) iT = 0;
      else if (iT < minT) iT = minT;
      else if (iT > maxT) iT = maxT;
      el.style.left = wrap.style.width = iT + 'px';
      return false;
    };
  }
  // drag and drop in the menu area-release the mouse
  function removeMouseup(el: any) {
    const wrap = getEl(sidebarRef);
    document.onmouseup = function () {
      document.onmousemove = null;
      document.onmouseup = null;
      wrap.style.transition = 'width 0.2s';
      const width = parseInt(wrap.style.width);

      if (!mix) {
        const minWith = unref(getMinWidthNumber);
        if (!unref(getCollapsed))
          width > minWith + 20
            ? setMenuSetting({ menuWidth: width })
            : setMenuSetting({ collapsed: true });
        else width > minWith && setMenuSetting({ collapsed: false, menuWidth: width });
      } else setMenuSetting({ menuWidth: width });
      // Non-standard see https://developer.mozilla.org/en-US/docs/Web/API/Document/releaseCapture
      el.releaseCapture?.();
    };
  }

  function changeWrapWidth() {
    const el = getEl(dragBarRef);
    const wrap = getEl(sidebarRef);
    if (!el || !wrap) return;
    (el as HTMLElement).onmousedown = (e: MouseEvent) => {
      (wrap as HTMLElement).style.transition = 'unset';
      const clientX = e?.clientX;
      el.left = el.offsetLeft;
      handleMouseMove(el, wrap, clientX);
      removeMouseup(el);
      el.setCapture?.();
      return false;
    };
  }
  return {};
}
