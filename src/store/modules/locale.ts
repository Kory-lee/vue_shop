import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import { LOCALE_KEY } from '/@/enums/cacheEnum';
import { LocaleType } from '/@/locales/types';
import { localeSetting } from '/@/settings/localeSetting';
import store from '/@/store';
import { LocaleSetting } from '/@/types/config';
import { createLocalStorage } from '/@/utils/cache';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';

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
