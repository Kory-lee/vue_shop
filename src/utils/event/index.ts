import ResizeObserver from 'resize-observer-polyfill';
import { isFunction } from '../is';

function resizeHandler(entries: any[]) {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners__ || [];
    if (!listeners.length) continue;
    listeners.forEach((fn: () => any) => isFunction(fn) && fn());
  }
}

const isServer = typeof window === 'undefined';
export function addResizeListener(el: any, fn: () => any) {
  if (isServer) return;
  if (!el.__resizeListeners__) {
    el.__resizeListeners__ = [];
    el.__ro__ = new ResizeObserver(resizeHandler);
    el.__ro__.observe(el);
  }
  el.__resizeListeners__.push(fn);
}

export function removeResizeListener(el: any, fn: () => any) {
  if (!el?.__resizeListeners__) return;
  const index = el.__resizeListeners__.indexOf(fn);
  if (index === -1) return;

  el.__resizeListeners__.splice(index, 1);
  if (!el.__resizeListeners__.length) el.__ro__.disconnect();
}

export function triggerWindowResize() {
  let event;
  if (typeof Event === 'function') {
    event = new Event('resize', {
      bubbles: true,
      cancelable: true,
    });
  } else {
    event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, true);
    (event as any).eventType = 'message';
  }
  window.dispatchEvent(event);
}
