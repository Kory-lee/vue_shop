import { createApp } from "vue";
import App from "./App";
import antD from "./plugins/antD";
import router from "./router";
import store from "./store";
import "./styles/index.less";
const app = createApp(App);

app.use(store).use(router).use(antD).mount("#app");
