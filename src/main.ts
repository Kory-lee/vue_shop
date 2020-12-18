import { createApp } from 'vue';
import App from './App.vue';
import i18n from './plugins/i18n';
// This Module only introduces components globally before login
import antDesign from './plugins/registerComponents';
import router from './router';
import store from './store';

export const app = createApp(App);

app.use(i18n).use(antDesign).use(router).use(store);
router.isReady().then(() => app.mount('#app'));
