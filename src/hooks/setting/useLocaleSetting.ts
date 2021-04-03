import { computed } from 'vue';
import { localeList } from '/@/settings/localeSetting';
import projectSetting from '/@/settings/projectSetting';
import configStore from '/@/store/modules/config';
import { LocaleSetting } from '/@/types/config';

export const getLocaleList = localeList;

export const getLocale = computed(
  () => configStore.getProjectConfig.locale || projectSetting.locale
);
export const getLang = computed(() => getLocale.value.lang);

export const getAvailableLocales = computed(() => getLocale.value.availableLocales);

export const getFallbackLocale = computed(() => getLocale.value.fallback);

export const getShowLocale = computed(() => getLocale.value.show);

export function setLocale(locale: Partial<LocaleSetting>) {
  configStore.commitProjectConfigState({ locale });
}

export function useLocaleSetting() {
  return {
    setLocale,

    getLocale,
    getLang,
    getAvailableLocales,
    getFallbackLocale,
    getShowLocale,
  };
}
