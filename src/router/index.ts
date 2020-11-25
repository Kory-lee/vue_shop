import type { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { basicRoutes } from "./routes";
const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as RouteRecordRaw[],
  strict: true,
});
export default {
  install(app: App<Element>) {
    app.use(router);
    // createGuard(router)
  },
};
