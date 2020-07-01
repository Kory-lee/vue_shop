import { GetCategoryAll, GetCategory, GetList, DeleteCategory } from '@api/news';
import { Error } from '@utils/global';
import { indexArr, responseInit } from '@utils/common';
const initData = (fn, thenCb = () => {}) => {
  return fn()
    .then((response) => {
      thenCb(response);
      return response.data;
    })
    .catch((err) => Error(err.message));
};
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
  UPDATE_CATEGORY(state, newData) {
    state.infoCategory.data = initCategory(newData.data);
  },
  UPDATE_INFO_LIST(state, newData) {
    responseInit(state.infoList, newData);
  },
  EDIT_INFO_LIST(state, params) {
    let index = indexArr(state.infoList.data, params.id);
    responseInit(state.infoList.data[index], params.data);
  },
  DELETE_CATEGORY(state, deleteId) {
    let index = indexArr(state.infoCategory.data, deleteId, 'value');
    state.infoCategory.data?.splice(index, 1);
  },
};
const actions = {
  async getInfoCategory({ commit }, params) {
    commit('UPDATE_CATEGORY', await initData(() => GetCategory(params)));
  },
  getAllInfoCateGory() {
    return GetCategoryAll({});
  },
  async getInfoList({ commit }, params) {
    commit('UPDATE_INFO_LIST', await initData(() => GetList(params)));
  },
  async deleteInfoCategory({ commit }, id) {
    initData(
      () => DeleteCategory({ categoryId: id }),
      () => commit('DELETE_CATEGORY', id)
    );
  },
};
export default { namespaced: true, state, mutations, actions, getters };
