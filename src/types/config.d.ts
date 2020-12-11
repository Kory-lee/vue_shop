import type { LocaleType } from '../locales/types';

export interface LocaleSetting {
  show: boolean;
  lang: LocaleType;
  fallback: LocaleType;
  availableLocales: LocaleType[];
}
export interface GlobeEnvConfig {
  title: string;
  apiUrl: string;
  shortName: string;
  uploadUrl?: string;
  urlPrefix?: string;
}
