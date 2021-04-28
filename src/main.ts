import { createApp } from 'vue';
import App from './App.vue';
import { setupI18n } from './i18n';
import setupGlobalDirective from './plugins/directives';
// This Module only introduces components globally before login
import globalCom from './plugins/registerComponents';
import router, { setupRouter } from './router';
import { setupStore } from './store';

if (import.meta.env.DEV) import('ant-design-vue/dist/antd.less');

(async () => {
  const app = createApp(App);

  setupStore(app);

  app.use(globalCom);

  setupGlobalDirective(app);

  await setupI18n(app);

  setupRouter(app);

  await router.isReady();

  app.mount('#app', true);

  if (import.meta.env.DEV) {
    window.__APP__ = app;
  }
})();
