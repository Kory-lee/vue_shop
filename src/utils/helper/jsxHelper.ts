import type { Slots } from 'vue';

import { isFunction } from '/@/utils/is';

export function getSlot(slots: Slots, slot = 'default', data?: any) {
  if (!slots || !Reflect.has(slots, slot)) return null;
  const slotFn = slots[slot];
  if (!isFunction(slotFn)) {
    console.error(`${slot} is not a function`);
    return null;
  }
  return slotFn(data);
}

export function extendSlots(slots: Slots, excludeKeys: string[] = []) {
  const ret: Recordable<() => ReturnType<typeof getSlot>> = {};
  for (const key of Object.keys(slots)) {
    if (excludeKeys.includes(key)) continue;
    ret[key] = () => getSlot(slots, key);
  }
  return ret;
}
