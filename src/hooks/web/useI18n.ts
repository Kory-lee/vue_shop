import { LocaleType } from '/@/locales/types';
import { i18n } from '/@/plugins/i18n';

export function useI18n() {
  const { t } = i18n.global;
  return { t };
}

export function setI18n(locale:LocaleType) {

}

export const t = (key: string) => key;
