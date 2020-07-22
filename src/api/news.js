import { post } from "./index";

export const news = {
  getUserList: "/news/getList/",
  getList: "/news/getList/",
  getCategory: "/news/getCategory/",
  getCategoryAll: "/news/getCategoryAll/",
  deleteCategory: "/news/deleteCategory/",
  editCategory: "/news/editCategory/",
  deleteInfo: "/news/deleteInfo/",
  editInfo: "/news/editInfo/",
  addInfo: "/news/add/",
  addFirstCategory: "/news/addFirstCategory/",
  addChildrenCategory: "/news/addChildrenCategory/",
};

export const GetList = (data) => post(news.getList, data);
export const GetCategory = (data = {}) => post(news.getCategory, data);
export const GetCategoryAll = (data) => post(news.getCategoryAll, data);
export const DeleteCategory = (data) => post(news.deleteCategory, data);
export const EditCategory = (data) => post(news.editCategory, data);
export const DeleteInfo = (data) => post(news.deleteInfo, data);
export const EditInfo = (data) => post(news.editInfo, data);
export const AddInfo = (data) => post(news.addInfo, data);
export const AddFirstCategory = (data) => post(news.addFirstCategory, data);
export const AddChildrenCategory = (data) =>
  post(news.addChildrenCategory, data);
