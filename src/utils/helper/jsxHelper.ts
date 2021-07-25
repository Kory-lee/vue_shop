import type { Slots, VNodeChild } from 'vue';
import { isFunction } from '/@/utils/is';

export function getSlot(
  slots: Slots,
  slot = 'default',
  data?: any,
  fallback: VNodeChild[] = []
): VNodeChild[] {
  if (!slots || !Reflect.has(slots, slot)) return fallback;
  const slotFn = slots[slot];
  if (!isFunction(slotFn)) {
    console.error(`${slot} is not a function`);
    return fallback;
  }
  return slotFn(data);
}

export function extendSlots(slots: Slots, excludeKeys: string[] = []) {
  const ret: any = {};
  for (const key of Object.keys(slots)) {
    if (excludeKeys.includes(key)) continue;
    ret[key] = () => getSlot(slots, key);
  }
  return ret;
}
