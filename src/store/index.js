import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import app from "./modules/app";
import login from "./modules/login";
import common from "./modules/common";
import user from "./modules/user";
import infoDetail from "./modules/infoDetail";
import permission from "./modules/permission";

export default new Vuex.Store({
  modules: { app, login, common, infoDetail, user, permission },
});
