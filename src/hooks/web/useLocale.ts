import { computed, unref } from 'vue-demi';
import { i18n } from '/@/i18n';
import { useLocaleStoreWithout } from '/@/store/modules/locale';
import { LocaleType } from '/@/types/config';
import { setHtmlPageLang } from '/@/i18n/helper';

interface LangModule {
  message: Recordable;
  momentLocale: Recordable;
  momentLocaleName: string;
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithout();
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocaleInfo({ locale });
  setHtmlPageLang(locale);
}

// Switching the language will change the locale of useI18n
// And submit to configuration modification

const loadLocalePool: LocaleType[] = [];

export function useLocale() {
  const localeStore = useLocaleStoreWithout();

  const getLocale = computed(() => localeStore.getLocale),
    getShowLocalePicker = computed(() => localeStore.getShowPicker),
    getAntdLocale = computed(
      () => i18n.global.getLocaleMessage(unref(getLocale))?.antdLocale ?? {}
    );

  //switching the language will change the locale of useI18n
  //and submit to configuration modification
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) return locale;

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }

    const langModule = ((await import(`../../i18n/lang/${locale}.ts`)) as any)
      .default as LangModule;
    if (!langModule) return;

    const { message } = langModule;

    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  return { getLocale, getShowLocalePicker, changeLocale, getAntdLocale };
}
