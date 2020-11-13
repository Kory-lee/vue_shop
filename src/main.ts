import { createApp } from "vue";
import App from "./App";
import store from "./store";
import antD from "/@/plugin/ant-design-vue/index";
import router from "/@/router";
const app = createApp(App);

app.use(router).use(store).use(antD).mount("#app");
