import type { ComputedRef, CSSProperties, InjectionKey, Ref, VNode } from 'vue';

export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual';

export interface PopoverInst {
  syncPosition: () => void;
  setShow: (value: boolean) => void;
}
export type PopoverBodyInjection = Ref<HTMLElement | null> | null;

export const popoverBodyInjectionKey: InjectionKey<PopoverBodyInjection> =
  Symbol('popoverBodyInjection');

export type InternalRenderBody = (
  className: any,
  ref: Ref<HTMLElement | null> | HTMLElement | null,
  style: ComputedRef<CSSProperties> | CSSProperties,
  onMouseenter: (e: MouseEvent) => void,
  onMouseleave: (e: MouseEvent) => void
) => VNode;
