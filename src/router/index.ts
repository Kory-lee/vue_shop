import type { App } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { basicRoutes } from "./routes";
const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes as RouteRecordRaw[],
  strict: true,
});
export default {
  install(app: App<Element>) {
    app.use(router);
    // createGuard(router)
  },
};
