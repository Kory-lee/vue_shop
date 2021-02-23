import { computed, nextTick, onMounted, ref, Ref, unref } from 'vue';
import { TriggerEnum } from '/@/enums/menuEnums';
import { useDebounce } from '/@/hooks/core/useDebounce';
import {
  getCollapsed,
  getMinWidthNumber,
  getSplit,
  getTrigger,
  setMenuSetting,
} from '../../../hooks/setting/MenuSetting';
export function sidebarEvent() {
  const initRef = ref(false),
    brokenRef = ref(false),
    collapseRef = ref(true),
    getCollapsedWidth = computed(() => (unref(brokenRef) ? 0 : unref(getMinWidthNumber)));

  function onCollapseChange(val: boolean) {
    if (unref(initRef)) {
      collapseRef.value = val;
      setMenuSetting({ collapsed: val });
    } else !unref(getCollapsed) && setMenuSetting({ collapsed: val });
    initRef.value = true;
  }

  function onBreakpointChange(broken: boolean) {
    brokenRef.value = broken;
  }
  return { getCollapsedWidth, onCollapseChange, onBreakpointChange };
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
      const [exec] = useDebounce(changeWrapWidth, 80);
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
      let iT = (el as any).left + innerE.clientX - clientX;
      innerE = innerE || window.event;
      const maxT = 800,
        minT = unref(getMinWidthNumber);
      if (iT < 0) iT = 0;
      else if (iT < minT) iT = minT;
      else if (iT > maxT) iT = maxT;
      el.style.left = wrap.style.width = iT + 'px';
      return false;
    };
  }

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
      // TODO Non-standard see https://developer.mozilla.org/en-US/docs/Web/API/Document/releaseCapture
      // only <= iE 5
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
