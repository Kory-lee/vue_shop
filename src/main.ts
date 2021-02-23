import { createApp } from 'vue';
import App from './App.vue';
import i18n from './plugins/i18n';
import { initConfigStore } from './plugins/init';
// This Module only introduces components globally before login
import globalCom from './plugins/registerComponents';
import { installRouter, routerIsReady } from './router';
import { installStore } from './store';
import { isDevMode } from './utils/env';
initConfigStore();
const app = createApp(App);

app.use(globalCom).use(i18n).use(installRouter).use(installStore);

routerIsReady().then(() => app.mount('#app', true));

if (isDevMode()) {
  app.config.performance = true;
  window.__APP__ = app;
}
