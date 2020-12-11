import { createI18n, I18n, I18nOptions } from 'vue-i18n';
import messages from '/@/locales';
console.log(messages);
const lang = 'zh_CN';
const localData: I18nOptions = {
  legacy: false,
  locale: lang,
  messages,
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

  const { t, ...methods } = i18n.global;
  return {
    ...methods,
    t: (key: string, ...arg: Parameters<typeof t>) => t(getKey(key), ...arg),
  };
}

export default i18n;
