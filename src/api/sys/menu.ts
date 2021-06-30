import type { getMenuListByIdParamsResultModel } from './model/menuModel';
import http from '/@/utils/http';

enum Api {
  getMenuList = '/getMenuList',
}

export const getMenuList = () =>
  http.get<getMenuListByIdParamsResultModel>({ url: Api.getMenuList });
