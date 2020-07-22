const state = {
  isCollapse: false || JSON.parse(sessionStorage.getItem("isCollapse")),
};
const getters = { isCollapse: (state) => state.isCollapse };
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
};
const actions = {};

export default { namespaced: true, state, getters, mutations, actions };
