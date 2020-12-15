import { computed } from 'vue';
import configStore from '/@/store/modules/config';
import { TransitionSetting } from '/@/types/config';

export const getTransitionSetting = computed(() => configStore.getProjectConfig.transitionSetting);

export const getEnabledTransition = computed(() => getTransitionSetting.value?.enable);

export const getOpenNProgress = computed(() => getTransitionSetting.value?.openNProgress);

export const getOpenPageLoading = computed(
  (): boolean => !!getTransitionSetting.value?.openPageLoading
);

export const getBasicTransition = computed(() => getTransitionSetting.value?.basicTransition);

export function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
  // configStore.comm()
}

export default function useTransitionSetting() {
  return {
    setTransitionSetting,

    getTransitionSetting,
    getEnabledTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}
