import { LoginParams, LoginResultModel } from './model/userModel';
import http from '/@/utils/http';
import { ErrorMessageMode } from '/@/utils/http/type';

enum Api {
  Login = '/login',
  GetUserInfoById = '/getUserInfoById',
  GetPermCodeByUserId = '/getPermCodeByUserId',
}

export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return http.request<LoginResultModel>(
    { url: Api.Login, method: 'POST', params },
    { errorMessageMode: mode }
  );
}
