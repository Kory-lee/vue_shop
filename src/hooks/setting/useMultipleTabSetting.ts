import type { MultipleTabsSetting } from '/@/types/config';

import { computed, unref } from 'vue';
import useConfigStore from '/@/store/modules/config';

export const getMultipleTabSetting = computed(() => {
  const configStore = useConfigStore();
  return configStore.getProjectConfig.multipleTabsSetting;
});
export const getShowMultipleTab = computed(() => unref(getMultipleTabSetting).show);

export const getShowQuick = computed(() => unref(getMultipleTabSetting).showQuick);

export const getShowRefresh = computed(() => unref(getMultipleTabSetting).showRefresh);

export const getShowFold = computed(() => unref(getMultipleTabSetting).showFold);

export function setMultipleTabSetting(multipleTabsSetting: Partial<MultipleTabsSetting>) {
  const configStore = useConfigStore();
  configStore.setProjectConfig({ multipleTabsSetting });
}
