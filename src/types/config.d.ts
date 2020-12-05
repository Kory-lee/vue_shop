import type { LocaleType } from '/@/plugins/i18n/types';

export interface LocaleSetting {
  show: boolean;
  lang: LocaleType;
  fallback: LocaleType;
  availableLocales: LocaleType[];
}
