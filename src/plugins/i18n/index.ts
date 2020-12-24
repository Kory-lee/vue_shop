import { App } from 'vue';
import { createI18n, I18n, I18nOptions } from 'vue-i18n';
import { setupLocale } from '/@/hooks/web/useLocale';
import messages from '/@/locales';
import projectSetting from '/@/settings/projectSetting';
const { lang, fallback, availableLocales } = projectSetting?.locale;

const localData: I18nOptions = {
  legacy: false,
  locale: lang,
  messages,
  sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
  silentFallbackWarn: true,
  silentTranslationWarn: false,
  fallbackLocale: fallback,
  availableLocales,
};
const i18n = createI18n(localData) as I18n;

const { install } = i18n;
i18n.install = (app: App<Element>, ...args: any) => {
  setupLocale();
  install(app, ...args);
};

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
export const t = (key: string) => key;

export default i18n;
