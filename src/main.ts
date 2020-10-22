import { createApp } from "vue";
import App from "./App.vue";
import antD from "/@/plugin/ant-design-vue/index";
import router from "/@/router";
import "/@/styles/index.less";

const app = createApp(App);

app.use(router).use(antD);
app.mount("#app");
