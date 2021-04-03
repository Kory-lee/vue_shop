import moment from 'moment';
import { unref } from 'vue-demi';
import { localeStore } from '../store/modules/locale';
import { LocaleType } from '/@/locales/types';
import { i18n } from '/@/plugins/i18n';

interface LangModule {
  message: Recordable;
  momentLocale: Recordable;
  momentLocaleName: string;
}

const loadLocalePool: LocaleType[] = [];

export const t = (key: string) => key;

export function useI18n() {
  const { t: _t } = i18n.global || { t };
  return { t: _t };
}

function setI18n(locale: LocaleType) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocaleInfo({ locale });
  document.querySelector('html')?.setAttribute('lang', locale);
}
// Switching the language will change the locale of useI18n
// And submit to configuration modification
export async function changeLocale(locale: LocaleType) {
  const globalI18n = i18n.global;
  const currentLocale = unref(globalI18n.locale);
  if (currentLocale === locale) return locale;

  if (loadLocalePool.includes(locale)) {
    setI18n(locale);
    return locale;
  }
  const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
  if (!langModule) return;

  const { message, momentLocale, momentLocaleName } = langModule;

  globalI18n.setLocaleMessage(locale, message);
  moment.updateLocale(momentLocaleName, momentLocale);
  loadLocalePool.push(locale);

  setI18n(locale);
  return locale;
}
