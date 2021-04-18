import { computed, unref } from 'vue';
import { TransitionSetting } from '/@/types/config';
import { useConfigStoreWidthOut } from '/@/store/modules/config';

const configStore = useConfigStoreWidthOut();
export const getTransitionSetting = computed(() => configStore.getProjectConfig.transitionSetting);

export const getEnableTransition = computed(() => unref(getTransitionSetting)?.enable);

export const getOpenNProgress = computed(() => getTransitionSetting.value?.openNProgress);

export const getOpenPageLoading = computed(
  (): boolean => !!getTransitionSetting.value?.openPageLoading
);

export const getBasicTransition = computed(() => getTransitionSetting.value?.basicTransition);

export function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
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
