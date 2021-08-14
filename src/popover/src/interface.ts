import type { CSSProperties, Ref, VNode } from 'vue';

export type InternalRenderBody = (
  className: any,
  ref: Ref<HTMLElement | null>,
  style: Ref<CSSProperties>,
  onMouseenter: (e: MouseEvent) => void,
  onMouseleave: (e: MouseEvent) => void
) => VNode;
