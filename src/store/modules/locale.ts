import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { LOCALE_KEY } from '/@/enums/cacheEnum';
import { LocaleType } from '/@/locales/types';
import { localeSetting } from '/@/settings/localeSetting';
import store from '/@/store';
import { LocaleSetting } from '/@/types/config';
import { createLocalStorage } from '/@/utils/cache';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';
import { defineStore } from 'pinia';

const ls = createLocalStorage(),
  lsSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

const NAME = 'app-locale';
hotModuleUnregisterModule(NAME);
@Module({ name: NAME, store, dynamic: true, namespaced: true })
class Locale extends VuexModule {
  private info: LocaleSetting = lsSetting;

  get getShowPicker(): boolean {
    return !!this.info?.showPicker;
  }

  get getLocale(): LocaleType {
    return this.info?.locale;
  }

  @Mutation
  setLocaleInfo(info: Partial<LocaleSetting>): void {
    this.info = { ...this.info, ...info };
    ls.get(LOCALE_KEY, this.info);
  }

  @Action
  initLocale(): void {
    this.setLocaleInfo({
      ...localeSetting,
      ...this.info,
    });
  }
}

export const localeStore = getModule<Locale>(Locale);
// const ls = createLocalStorage();

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
// export function useLocaleStoreWithout() {
//   return useLocaleStore(store);
// }
