import { computed, unref } from 'vue';
import { MultipleTabsSetting } from '/@/types/config';
import useConfigStore from '/@/store/modules/config';

const configStore = useConfigStore();
export const getMultipleTabSetting = computed(
  () => configStore.getProjectConfig.multipleTabsSetting
);
export const getShowMultipleTab = computed(() => unref(getMultipleTabSetting).show);

export const getShowQuick = computed(() => unref(getMultipleTabSetting).showQuick);

export const getShowRefresh = computed(() => unref(getMultipleTabSetting).showRefresh);

export const getShowFold = computed(() => unref(getMultipleTabSetting).showFold);

export function setMultipleTabSetting(multipleTabsSetting: Partial<MultipleTabsSetting>) {
  configStore.setProjectConfig({ multipleTabsSetting });
}
