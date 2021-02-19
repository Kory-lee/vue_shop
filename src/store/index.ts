import { createStore } from 'vuex';
import { config } from 'vuex-module-decorators';
import { isDevMode } from '../utils/env';
import configStore from './modules/config';
import tabStore from './modules/tab';
config.rawError = true;
const isDev = isDevMode();
const store = createStore({
  strict: isDev,
});
export default store;
export { configStore, tabStore };
