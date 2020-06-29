import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';
import App from './App';
import router from './router';
import store from './store';
Vue.use(VueCompositionApi);
import {
  Form,
  FormItem,
  Button,
  Input,
  Row,
  Col,
  Menu,
  MenuItem,
  Submenu,
  Select,
  Table,
  TableColumn,
  Container,
  Header,
  Aside,
  Main,
  Card,
  Pagination,
  Dialog,
  DatePicker,
  TimeSelect,
  TimePicker,
  Loading,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Upload,
} from 'element-ui';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Select);
Vue.use(Table);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Card);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(TimeSelect);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Upload);

Vue.use(Loading.directive);

import '@icons';

// global test
import { install } from '@utils/global';
// 将msg与msgbox组件封装
Vue.use(install);

import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition);
Vue.config.productionTip = false;

Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
