import { createI18n, I18n, I18nOptions } from 'vue-i18n';
import zh_CN from '/@/locales/lang/zh_CN';
const localData: I18nOptions = {
  legacy: false,
  locale: 'zh_CN',
  messages: { zh_CN },
  sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
  silentFallbackWarn: true,
  silentTranslationWarn: false,
  // fallbackLocal:fallback,
  // availableLocales,
};

const i18n = createI18n(localData) as I18n;

export function useI18n(namespace?: string) {
  function getKey(key: string): string {
    if (!namespace || key.startsWith(namespace)) return key;
    return `${namespace}.${key}`;
  }
  const normal = { t: (key: string) => getKey(key) };
  if (!i18n) return normal;

  const { t } = i18n.global;
  return {
    ...i18n.global,
    t: (key: string, ...arg: any) => t(getKey(key), ...(arg as Parameters<typeof t>)),
  };
}
export function setI18nLanguage(i18n: I18n, locale: any): void {
  if (i18n.mode === 'legacy') i18n.global.locale = locale;
  else i18n.global.locale.value = locale;
  document.querySelector('html')?.setAttribute('lang', locale);
}

export async function loadLocaleMessage(i18n: I18n, locale: any) {
  if (i18n.global.availableLocales.includes(locale)) {
    const message = await import(`/@/locales/lang/${locale}`);
    console.log(message);
    i18n.global.setLocaleMessage(locale, message.default);
  }
}
loadLocaleMessage(i18n, 'en');

export default i18n;
