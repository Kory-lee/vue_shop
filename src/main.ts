import { createApp } from 'vue';
import App from './App.vue';
import { setupI18n } from './i18n';
// This Module only introduces components globally before login
import globalCom from './plugins/registerComponents';
import router from './router';
import { setupStore } from './store';
import { isDevMode } from './utils/env';

// if (import.meta.env.DEV) import('ant-design-vue/dist/antd.less');

(async () => {
  const app = createApp(App);
  setupStore(app);

  app.use(globalCom).use(router);

  await setupI18n(app);

  await router.isReady();

  app.mount('#app', true);
  if (isDevMode()) {
    window.__APP__ = app;
  }
})();
