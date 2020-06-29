import { post } from './index';
const user = {
  getUserList: '/user/getList/',
  add: '/user/add/',
};
export const GetUserList = (data = { pageNumber: 1, pageSize: 10 }) => post(user.getUserList, data);
export const AddUser = (data) => post(user.addUser, data);
