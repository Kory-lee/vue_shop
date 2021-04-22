import { computed, unref } from 'vue-demi';
import i18n from '/@/i18n';
import { useLocaleStoreWithout } from '/@/store/modules/locale';

const localeStore = useLocaleStoreWithout();
export const getLocale = computed(() => localeStore.getLocale);
export const getShowLocalePicker = computed(() => localeStore.getShowPicker);

export const getAntdLocale = computed(() => {
  return i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale;
});
