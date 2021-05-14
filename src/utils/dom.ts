export interface ViewportOffsetResult {
  left: number;
  top: number;
  right: number;
  bottom: number;
  rightIncludeBody: number;
  bottomIncludeBody: number;
}
export function getBoundingClientRect(ele: Element): DOMRect | number {
  if (!ele?.getBoundingClientRect()) return 0;
  return ele.getBoundingClientRect();
}

export function getViewportOffset(element: Element): ViewportOffsetResult {
  const doc = document.documentElement;

  const docScrollLeft = doc.scrollLeft,
    docScrollTop = doc.scrollTop,
    docClientLeft = doc.clientLeft,
    docClientTop = doc.clientTop;

  const pageXOffset = window.pageXOffset,
    pageYOffset = window.pageYOffset;

  const box = getBoundingClientRect(element);
  const { left: rectLeft, top: rectTop, width: rectWidth, height: rectHeight } = box as DOMRect;

  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0),
    scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0),
    offsetLeft = rectLeft + pageXOffset,
    offsetTop = rectTop + pageYOffset;

  const left = offsetLeft - scrollLeft,
    top = offsetTop - scrollTop;

  const clientWidth = window.document.documentElement.clientWidth,
    clientHeight = window.document.documentElement.clientHeight;

  return {
    left,
    top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top,
  };
}
