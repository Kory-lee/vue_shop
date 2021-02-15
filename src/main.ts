import { createApp } from 'vue';
import App from './App.vue';
import i18n from './plugins/i18n';
// This Module only introduces components globally before login
import antDesign from './plugins/registerComponents';
import router from './router';
import store from './store';

export const app = createApp(App);

app.use(antDesign).use(i18n).use(router).use(store);
// console.log(router.isReady());

app.mount('#app');
// router.isReady().then(() => app.mount('#app', true));
