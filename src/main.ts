import { createApp } from 'vue';
import App from './App.vue';
import { setupI18n } from './i18n';
import setupGlobalDirective from './plugins/directives';
import router, { setupRouter } from './router';
import { setupStore } from './store';

import 'vite-plugin-svg-icons/register';

if (import.meta.env.DEV) import('ant-design-vue/dist/antd.less');

(async () => {
  const app = createApp(App);

  setupStore(app);

  setupGlobalDirective(app);

  await setupI18n(app);

  setupRouter(app);

  await router.isReady();

  app.mount('#app', true);

  if (import.meta.env.DEV) {
    window.__APP__ = app;
  }
})();
