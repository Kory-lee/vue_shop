import { computed, unref } from 'vue';
import { MultiTabsSetting } from '/@/types/config';
import useConfigStore from '/@/store/modules/config';

const configStore = useConfigStore();
export const getMultipleTabSetting = computed(() => configStore.getProjectConfig.multiTabsSetting);
export const getShowMultipleTab = computed(() => unref(getMultipleTabSetting).show);

export const getShowQuick = computed(() => unref(getMultipleTabSetting).showQuick);

export const getShowRefresh = computed(() => unref(getMultipleTabSetting).showRefresh);

export const getShowFold = computed(() => unref(getMultipleTabSetting).showFold);

export function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
  configStore.setProjectConfig({ multiTabsSetting });
}
