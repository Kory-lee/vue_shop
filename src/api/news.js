import service from '@utils/request';
import { post } from './index';

export const news = {
  getUserList: '/news/getList/',
  getList: '/news/getList/',
  deleteInfo: '/news/deleteInfo/',
  editInfo: '/news/editInfo/',
  addInfo: '/news/add/',
  addChildrenCategory: '/news/addChildrenCategory/',
};

export const GetList = (data) => post(news.getList, data);
export const DeleteInfo = (data) => post(news.deleteInfo, data);
export function AddFirstCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/addFirstCategory/',
    data,
  });
}
export function GetCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/getCategory/',
    data,
  });
}

export function GetCategoryAll(data) {
  return service.request({
    method: 'post',
    url: '/news/getCategoryAll/',
    data,
  });
}
export function DeleteCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/deleteCategory/',
    data,
  });
}
export function EditCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/editCategory/',
    data,
  });
}

export function AddChildrenCategory(data) {
  return service.request({
    method: 'post',
    url: '/news/addChildrenCategory/',
    data,
  });
}

export function AddInfo(data) {
  return service.request({
    method: 'post',
    url: '/news/add/',
    data,
  });
}

export function EditInfo(data) {
  return service.request({
    method: 'post',
    url: '/news/editInfo/',
    data,
  });
}

// export function GetList(data) {
//   return service.request({
//     method: 'post',
//     url: '/news/getList/',
//     data,
//   });
// }

// export function DeleteInfo(data) {
//   return service.request({
//     method: 'post',
//     url: '/news/deleteInfo/',
//     data,
//   });
// }
