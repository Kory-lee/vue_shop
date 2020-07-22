import store from "@store";
import { getToken } from "@utils/cookie";
import Vue from "vue";
import VueRouter from "vue-router";
import { defaultRoutersMap } from "./routes";
Vue.use(VueRouter);

// Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
// 系统分配
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: defaultRoutersMap,
});
// 路由守卫
// 白名单
const whiteRouter = ["/login", "login"];
router.beforeEach((to, from, next) => {
  if (to.meta.name) document.title = to.meta.name;
  if (getToken())
    if (!store.getters["permission/roles"]?.length)
      store.dispatch("permission/getUserRoles").then(({ role }) =>
        store.dispatch("permission/createRouter", role).then(() => {
          let addRouters = store.getters["permission/addRouters"];
          let allRouters = store.getters["permission/allRouters"];
          // 路由更新
          router.options.routes = allRouters;
          // 动态路由
          router.addRoutes(addRouters);
          // 不会留下history记录
          next({ ...to, replace: true });
        })
      );
    else next();
  else {
    if (whiteRouter.includes(to.path)) next();
    else next("/login");
  }
});

export default router;
