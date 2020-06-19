import { Login } from '@api/login';
import { setToken, getToken, getUsername, removeToken } from '@utils/cookie';
const state = {
  username: '' || getUsername(),
  to_ken: '' || getToken(),
};
const getters = {
  username: (state) => state.username,
};
const mutations = {
  SET_USER_ID(state, { username, token } = { username: '', token: '' }) {
    setToken((state.username = username), (state.to_ken = token));
  },
};
const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) =>
      Login(data)
        .then((response) => {
          console.log(response);
          commit('SET_USER_ID', response.data);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        })
    );
  },
  exit({ commit }) {
    return new Promise((resolve) => {
      commit('SET_USER_ID');
      removeToken();
      resolve();
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
