import { createStore } from 'vuex';
import { config } from 'vuex-module-decorators';
import { isDevMode } from '../utils/env';

config.rawError = true;
const isDev = isDevMode();
const store = createStore({
  strict: isDev,
});
export default store;
