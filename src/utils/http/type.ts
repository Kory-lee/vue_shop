import { AxiosRequestConfig } from 'axios';
import AxiosTransform from './AxiosTransform';
export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export interface RequestOptions {
  // 请求参数拼接到url
  joinParamsToUrl?: boolean;
  // 格式化请求参数时间
  formatData?: boolean;
  // 是否处理请求结果
  isTransformRequestResult?: boolean;
  // 受否加入url
  joinPrefix?: boolean;
  // 接口地址,不填则使用默认apiUrl
  apiUrl?: string;
  // 错误消息提示类型
  errorMessageMode?: ErrorMessageMode;
  // 是否加入时间戳
  joinTime?: boolean;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  prefixUrl?: string;
  transform?: AxiosTransform<Result>;
  requestOptions?: RequestOptions;
}

export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}

export interface UploadFileParams {
  // 其他参数
  data?: Indexable;
  // 文件参数的就扣字段名
  name?: string;
  // 文件
  file: File | Blob;
  filename?: string;
  [key: string]: any;
}
