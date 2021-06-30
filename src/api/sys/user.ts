import { GetUserInfoByUserIdModel, LoginParams, LoginResultModel } from './model/userModel';
import http from '/@/utils/http';
import { ErrorMessageMode } from '/@/utils/http/type';

enum Api {
  Login = '/login',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
}

export function loginApi(params: LoginParams, errorMessageMode: ErrorMessageMode = 'modal') {
  return http.post<LoginResultModel>({ url: Api.Login, params }, { errorMessageMode });
}

export function getUserInfo() {
  return http.get<GetUserInfoByUserIdModel>({ url: Api.GetUserInfo });
}

export function getPermCode() {
  return http.get<string[]>({ url: Api.GetPermCode });
}

export function logoutApi() {
  return http.get({ url: Api.Logout });
}
