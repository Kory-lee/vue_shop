import { GetCategoryAll, GetCategory } from '../../api/news';

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
export default { namespaced: true, actions };
