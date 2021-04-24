import type { TransitionSetting } from '/@/types/config';

import { computed, unref } from 'vue';
import { useConfigStoreWidthOut } from '/@/store/modules/config';

export const getTransitionSetting = computed(() => {
  const configStore = useConfigStoreWidthOut();
  return configStore.getProjectConfig.transitionSetting;
});

export const getEnableTransition = computed(() => unref(getTransitionSetting)?.enable);

export const getOpenNProgress = computed(() => getTransitionSetting.value?.openNProgress);

export const getOpenPageLoading = computed(
  (): boolean => !!getTransitionSetting.value?.openPageLoading
);

export const getBasicTransition = computed(() => getTransitionSetting.value?.basicTransition);

export function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
  const configStore = useConfigStoreWidthOut();

  configStore.setProjectConfig({ transitionSetting });
}

export default function useTransitionSetting() {
  return {
    setTransitionSetting,

    getTransitionSetting,
    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}
