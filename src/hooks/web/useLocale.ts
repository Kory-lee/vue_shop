import moment from 'moment';
import { ref } from 'vue';
import i18n from '/@/plugins/i18n';
import { LocaleType } from '/@/plugins/i18n/types';
const antConfigLocaleRef = ref<any>(null);
export function useLocale() {
  function changeLocale(lang: LocaleType) {
    (i18n.global.locale as any).value = lang;
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
  return { changeLocale, antConfigLocale: antConfigLocaleRef };
}
