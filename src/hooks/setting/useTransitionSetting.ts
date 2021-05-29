import type { TransitionSetting } from '/@/types/config';

import { computed, unref } from 'vue';
import { useConfigStoreWidthOut } from '/@/store/modules/config';

export const getTransitionSetting = computed(() => {
  const configStore = useConfigStoreWidthOut();
  return configStore.getProjectConfig.transitionSetting;
});

export const getEnableTransition = computed(() => unref(getTransitionSetting)?.enable);

export const getOpenNProgress = computed(() => unref(getTransitionSetting)?.openNProgress);

export const getOpenPageLoading = computed(
  (): boolean => !!unref(getTransitionSetting)?.openPageLoading
);

export const getBasicTransition = computed(() => unref(getTransitionSetting)?.basicTransition);

export function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
  const configStore = useConfigStoreWidthOut();

  configStore.setProjectConfig({ transitionSetting });
}
