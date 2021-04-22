import type { App } from 'vue';
import { createI18n, I18nOptions } from 'vue-i18n';
import { localeSetting } from '/@/settings/localeSetting';
import { useLocaleStoreWithout } from '/@/store/modules/locale';

const { fallback, availableLocales } = localeSetting;

async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStoreWithout(),
    locale = localeStore.getLocale,
    defaultLocale = await import(`./lang/${locale}.ts`),
    message = defaultLocale.default?.message ?? {};

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: { [locale]: message },
    availableLocales,
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

export let i18n: ReturnType<typeof createI18n>;

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options);
  app.use(i18n);
}
export default i18n;
