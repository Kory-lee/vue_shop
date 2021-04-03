import { computed, unref } from 'vue-demi';
import { i18n } from '/@/plugins/i18n';
import { localeStore } from '/@/store/modules/locale';

export const getLocale = computed(() => localeStore.getLocale);
export const getShowLocalePicker = computed(() => localeStore.getShowPicker);

export const getAntdLocale = computed(() => {
  return i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale;
});
