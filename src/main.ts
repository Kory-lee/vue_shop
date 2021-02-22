import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './plugins/i18n';
// This Module only introduces components globally before login
import globalCom from './plugins/registerComponents';
import store from './store';

export const app = createApp(App);

app.use(globalCom).use(i18n).use(router).use(store);

router.isReady().then(() => app.mount('#app', true));
