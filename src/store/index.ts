import { createStore } from 'vuex';
import { config } from 'vuex-module-decorators';
import { isDevMode } from '../utils/env';

config.rawError = true;

const store = createStore({ strict: isDevMode() });

export default store;

// const modules = import.meta.globEager('./modules/**');
// const StoreObj: { [key: string]: Object } = {};
// Object.keys(modules).forEach((mod) => {
//   console.log(mod);
//   const key = (mod.match(/\.\/modules\/(\S*)\.ts/) as RegExpMatchArray)[1];
//   StoreObj[key + 'Store'] = modules[mod];
// });
