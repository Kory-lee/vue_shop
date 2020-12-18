import moment from 'moment';
import { ref, unref } from 'vue';
import { I18n } from 'vue-i18n';
import { getLang, getLocale, setLocale } from '/@/hooks/setting/LocaleSetting';
import { LocaleType } from '/@/locales/types';
import i18n, { useI18n } from '/@/plugins/i18n';

console.log(useI18n());

const antConfigLocaleRef = ref<any>(null);

export async function loadLocaleMessage(i18n: I18n, locale: any) {
  if (i18n.global.availableLocales.includes(locale)) {
    const message = await import(`/@/locales/lang/${locale}`);
    i18n.global.setLocaleMessage(locale, message.default);
  }
}

export function useLocale() {
  function changeLocale(lang: LocaleType) {
    if (i18n.mode === 'legacy') i18n.global.locale = lang;
    else i18n.global.locale.value = lang;
    loadLocaleMessage(i18n, lang);
    document.querySelector('html')?.setAttribute('lang', lang);
    setLocale({ lang });
    switch (lang) {
      case 'zh_CN':
        import('ant-design-vue/es/locale/zh_CN').then(
          (locale) => (antConfigLocaleRef.value = locale.default)
        );
        moment.locale('cn');
        break;
      case 'en':
        import('ant-design-vue/es/locale/en_US').then(
          (locale) => (antConfigLocaleRef.value = locale.default)
        );
        moment.locale('en-us');
        break;
      default:
        break;
    }
  }
  function setupLocale() {
    const lang = unref(getLang);
    lang && changeLocale(lang);
  }
  return { setupLocale, getLocale, getLang, changeLocale, antConfigLocale: antConfigLocaleRef };
}
