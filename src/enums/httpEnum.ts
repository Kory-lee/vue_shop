export enum ResultEnum {
  SUCCESS = 1,
  ERROR = 1,
  TIMEOUT = 401,
  TYPE = 'success',
}

export enum RequestEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
