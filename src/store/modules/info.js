import { GetCategoryAll, GetCategory } from '../../api/news';

const actions = {
  getInfoCategory(cotent, request) {
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
export default { namespaced: true, actions };
