import {
  GetUserInfoByUserIdModel,
  GetUserInfoByUserIdParams,
  LoginParams,
  LoginResultModel,
} from './model/userModel';
import http from '/@/utils/http';
import { ErrorMessageMode } from '/@/utils/http/type';

enum Api {
  Login = '/login',
  GetUserInfoById = '/getUserInfoById',
  GetPermCodeByUserId = '/getPermCodeByUserId',
}

export function loginApi(params: LoginParams, errorMessageMode: ErrorMessageMode = 'modal') {
  return http.post<LoginResultModel>({ url: Api.Login, params }, { errorMessageMode });
}

export function getUserInfoById(params: GetUserInfoByUserIdParams) {
  return http.get<GetUserInfoByUserIdModel>({ url: Api.GetUserInfoById, params });
}

export function getPermCodeByUserId(params: GetUserInfoByUserIdParams) {
  return http.get<string[]>({
    url: Api.GetPermCodeByUserId,
    params,
  });
}