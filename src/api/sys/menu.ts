import type { getMenuListByIdParams, getMenuListByIdParamsResultModel } from './model/menuModel';
import http from '/@/utils/http';

enum Api {
  getMenuListById = '/getMenuListById',
}

export const getMenuListById = (params: getMenuListByIdParams) =>
  http.get<getMenuListByIdParamsResultModel>({ url: Api.getMenuListById, params });
