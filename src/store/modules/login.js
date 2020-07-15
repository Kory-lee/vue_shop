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
    return Login(data)
      .then(({ data, message }) => {
        commit('SET_USER_ID', data);
        return message;
      })
      .catch((err) => err);
  },
  exit({ commit }) {
    return new Promise((resolve) => {
      removeToken();
      // commit('SET_USER_ID');
      resolve();
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
