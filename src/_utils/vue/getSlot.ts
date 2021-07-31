import { isFunction } from 'lodash-es';
import { Slots, VNodeChild } from 'vue';

export default function getSlot(
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
