import { GetCategoryAll, GetCategory, GetList, DeleteCategory } from '@api/news';
import { Request } from '@utils/global';
import { indexArr, responseInit } from '@utils/common';
const initCategory = (value, id = 'id', category_name = 'category_name') =>
  value?.map((item) => {
    return { value: item[id], label: item[category_name] };
  });

const state = {
  qiniuUrl: 'http://www-web-jshtml-cn-idva7mx.web-jshtml.cn',
  infoCategory: { data: null },
  infoList: { data: null, total: null },
};
const getters = {
  qiniuUrl: (state) => state.qiniuUrl,
  infoCategory: (state) => state.infoCategory,
  infoList: (state) => state.infoList,
};
const mutations = {
  UPDATE_CATEGORY(state, { data }) {
    state.infoCategory.data = initCategory(data);
    return state.infoCategory.data;
  },
  UPDATE_INFO_LIST(state, newData) {
    responseInit(state.infoList, newData);
  },
  EDIT_INFO_LIST(state, { id, data }) {
    let index = indexArr(state.infoList.data, id);
    responseInit(state.infoList.data[index], data);
  },
  DELETE_CATEGORY(state, deleteId) {
    let index = indexArr(state.infoCategory.data, deleteId, 'value');
    state.infoCategory.data?.splice(index, 1);
  },
};
const actions = {
  async getInfoCategory({ commit }, params) {
    return commit('UPDATE_CATEGORY', await Request(() => GetCategory(params)));
  },
  getAllInfoCateGory() {
    return GetCategoryAll({});
  },
  async getInfoList({ commit }, params) {
    commit('UPDATE_INFO_LIST', await Request(() => GetList(params)));
  },
  async deleteInfoCategory({ commit }, id) {
    Request(
      () => DeleteCategory({ categoryId: id }),
      () => commit('DELETE_CATEGORY', id)
    );
  },
};
export default { namespaced: true, state, mutations, actions, getters };
