import { GetUserList } from "@api/user";
import { Request } from "@/plugins/element";
import { indexArr, responseInit } from "@utils/common";
const state = {
  userList: { data: null },
};
const getters = {
  userList: (state) => state.userList,
};
const mutations = {
  UPDATE_USER_LIST(state, { data }) {
    state.userList.data = data;
  },
  EDIT_INFO_LIST(state, { id, data }) {
    let index = indexArr(state.userList.data, id);
    responseInit(state.userList.data[index], data);
  },
};
const actions = {
  async getUserList({ commit }, params) {
    commit("UPDATE_USER_LIST", await Request(() => GetUserList(params)));
  },
};
export default { namespaced: true, state, mutations, actions, getters };
