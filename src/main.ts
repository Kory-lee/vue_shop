import { createApp } from 'vue';
import App from './App.vue';
import antD from './plugins/ant-design-vue';
import i18n from './plugins/i18n';
import router from './router';
import store from './store';
// import './styles/index.less';

const app = createApp(App);

app.use(store).use(router).use(antD).use(i18n).mount('#app');
