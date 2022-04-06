import type { LocaleSetting, LocaleType } from '/@/types/config';
import type { DropMenu } from '/@/components/Dropdown';

export const LOCALE: Record<'ZH_CN' | 'EN_US', LocaleType> = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  locale: LOCALE.ZH_CN,
  // default
  fallback: LOCALE.ZH_CN,
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};

export const localeList: DropMenu[] = [
  {
    text: '简体中文',
    event: LOCALE.ZH_CN,
  },
  {
    text: 'English',
    event: LOCALE.EN_US,
  },
];
