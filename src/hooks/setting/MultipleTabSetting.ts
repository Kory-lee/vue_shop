import { computed, unref } from 'vue';
import { configStore } from '/@/store/modules';
import { MultiTabsSetting } from '/@/types/config';
export const getMultipleTabSetting = computed(() => configStore.getProjectConfig.multiTabsSetting);
export const getShowMultipleTab = computed(() => unref(getMultipleTabSetting).show);

export const getShowQuick = computed(() => unref(getMultipleTabSetting).showQuick);

export const getShowRefresh = computed(() => unref(getMultipleTabSetting).showRefresh);

export const getShowFold = computed(() => unref(getMultipleTabSetting).showFold);

export function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
  configStore.commitProjectConfigState({ multiTabsSetting });
}
