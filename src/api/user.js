import { post } from './index';
const user = {
  cityPicker: '/cityPicker/',
  role: '/role/',
  getList: '/user/getList/',
  add: '/user/add/',
  edit: '/user/edit/',
  delete: '/user/delete/',
  actives: '/user/actives/',
  userRole: '/userRole/',
};
export const GetCityPicker = (data) => post(user.cityPicker, data);
export const GetRole = (data) => post(user.role, data);
export const GetUserList = (data) => post(user.getList, data);
export const AddUser = (data) => post(user.add, data);
export const EditUser = (data) => post(user.edit, data);
export const DeleteUser = (data) => post(user.delete, data);
export const activesUser = (data) => post(user.actives, data);
export const getUserRole = (data) => post(user.userRole, data);
