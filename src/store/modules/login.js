import { Login } from '@api/login';
import { setToken, getToken, getUsername, removeToken } from '@utils/cookie';
import { Success, Error } from '@utils/global';
const state = {
  username: getUsername() || '',
  to_ken: getToken() || '',
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
  login({ commit }, params) {
    return Login(params)
      .then(({ data, message }) => {
        commit('SET_USER_ID', data);
        Success(message);
      })
      .catch((message) => Error(message));
  },
  exit() {
    return new Promise((resolve) => {
      removeToken();
      resolve();
    });
  },
};

export default { namespaced: true, state, getters, mutations, actions };
