import type { LocaleSetting, LocaleType } from '/@/types/config';

import { LOCALE_KEY } from '/@/enums/cacheEnum';
import { localeSetting } from '/@/settings/localeSetting';
import store from '/@/store';
import { createLocalStorage } from '/@/utils/cache';
import { defineStore } from 'pinia';

const ls = createLocalStorage();

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface LocaleState {
  localeInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
  id: 'locale',
  state: (): LocaleState => ({ localeInfo: lsLocaleSetting }),
  getters: {
    getShowPicker() {
      return !!this.localeInfo?.showPicker;
    },
    getLocale(): LocaleType {
      return this.localeInfo.locale ?? 'zh_CN';
    },
  },
  actions: {
    /**
     * set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localeInfo = { ...this.localeInfo, ...info };
      ls.set(LOCALE_KEY, this.localeInfo);
    },
    /**
     * Initialize multilingual information and load existing configuration from the local cache
     */
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localeInfo,
      });
    },
  },
});

// Need to be used outside the setup
export function useLocaleStoreWithout() {
  return useLocaleStore(store);
}

export default useLocaleStore;
