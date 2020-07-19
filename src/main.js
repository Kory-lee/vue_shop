import element from '@/plugins/element';
import svgIcon from '@icons';
import { buttonPermission } from '@utils/buttonPermission';
import VueCompositionApi from '@vue/composition-api';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(element);
Vue.use(svgIcon);
Vue.use(VueCompositionApi);
Vue.prototype.btnPerm = buttonPermission;
Vue.config.productionTip = false;

Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
