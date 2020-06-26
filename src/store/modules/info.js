import { GetCategoryAll, GetCategory } from '@api/news';
const state = {
  qiniuUrl: 'http://www-web-jshtml-cn-idva7mx.web-jshtml.cn',
};
const getters = {
  qiniuUrl: (state) => state.qiniuUrl,
};
const actions = {
  getInfoCategory() {
    return GetCategory({})
      .then((result) => result)
      .catch((err) => err);
  },
  getAllInfoCateGory() {
    return GetCategoryAll({})
      .then((result) => result)
      .catch((err) => err);
  },
};
export default { namespaced: true, actions, state, getters };
