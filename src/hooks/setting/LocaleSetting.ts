import { computed } from 'vue';
import configStore from '/@/store/modules/config';

export const getLocale = computed(() => configStore.getProjectConfig.locale);
export function useLocaleSetting() {}
