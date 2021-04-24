import type { DescInstance, DescOptions, UseDescReturnType } from './types';

import { getCurrentInstance, ref, unref } from 'vue';
import { isProdMode } from '/@/utils/env';

export function useDescription(props?: Partial<DescOptions>): UseDescReturnType {
  if (!getCurrentInstance())
    throw new Error('Please put useDescription function in the setup function');
  const descRef = ref<Nullable<DescInstance>>(null);
  const loadedRef = ref(false);

  function register(instance: DescInstance) {
    if (unref(loadedRef) && isProdMode()) return;
    descRef.value = instance;
    props && instance.setDescProps(props);
    loadedRef.value = true;
  }
  const methods: DescInstance = {
    setDescProps: (descProps: Partial<DescOptions>) => {
      unref(descRef)?.setDescProps(descProps);
    },
  };
  return [register, methods];
}
