import { i18n } from '/@/i18n/index';

export const t = (key: string) => key;

export function useI18n() {
  const { t: _t } = i18n?.global || { t };
  return { t: _t };
}
