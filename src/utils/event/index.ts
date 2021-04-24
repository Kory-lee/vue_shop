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
