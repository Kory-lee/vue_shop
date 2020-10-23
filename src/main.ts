import { createApp } from "vue";
import App from "./App.vue";
import antD from "/@/plugin/ant-design-vue/index";
import router from "/@/router";

const app = createApp(App);

app.use(router).use(antD).mount("#app");
