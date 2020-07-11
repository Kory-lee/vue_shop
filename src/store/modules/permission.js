import { GetUserRole } from '@api/user';
import { defaultRoutersMap, asyncRoutersMap } from '@router/routers';
function hasPermission(roles, router) {
  if (router.meta && router.meta.role) return roles.some((item) => router.meta.role.includes(item));
}
const state = {
  roles: [],
  button: [],
  btnPerm: [],
  allRouters: defaultRoutersMap,
  addRouters: [],
};
const getters = {
  roles: (state) => state.roles,
  button: (state) => state.button,
  btnPerm: (state) => state.btnPerm,
  allRouters: (state) => state.allRouters,
  addRouters: (state) => state.addRouters,
};

const mutations = {
  SET_ROLES(state, value) {
    state.roles = value;
  },
  SET_BUTTON(state, value) {
    state.button = value;
  },
  SET_BTNPERM(state, value) {
    state.btnPerm = value;
  },
  SET_ROUTES(state, router) {
    state.addRouters = router;
    state.allRouters = defaultRoutersMap.concat(router);
  },
};
const actions = {
  /**
   *获取用户角色
   * @param {*} param0
   * @param {*} data
   */
  getUserRoles({ commit }, params = {}) {
    return new Promise((resolve, reject) =>
      GetUserRole(params)
        .then(({ data }) => {
          let { role, btnPerm, button } = data;
          commit('SET_ROLES', role);
          commit('SET_BUTTON', button);
          commit('SET_BTNPERM', btnPerm);
          resolve(data);
        })
        .catch((err) => reject(err))
    );
  },
  createRouter({ commit }, data) {
    return new Promise((resolve) => {
      let role = data;
      let addRouters;
      if (role.includes('admin')) addRouters = asyncRoutersMap;
      else {
        addRouters = asyncRoutersMap.filter((item) => {
          if (hasPermission(role, item)) {
            if (item.children && item.children?.length) {
              item.children = item.children.filter((child) => {
                if (hasPermission(role, child)) {
                  return child;
                }
              });
            }
          }
          return item;
        });
        // 404page-error
        addRouters.push(asyncRoutersMap.splice(asyncRoutersMap.length - 1));
      }
      commit('SET_ROUTES', addRouters);
      resolve();
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
