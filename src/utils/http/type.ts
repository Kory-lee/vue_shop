import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export interface RequestOptions {
  // 请求参数拼接到url
  joinParamsToUrl?: boolean;
  // 格式化请求参数时间
  formatDate?: boolean;
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
  ignoreCancelToken?: boolean;
  withToken?: boolean;
  // 请求重试机制
  retryRequest?: RetryRequest;
}

export interface RetryRequest {
  isOpenRetry: boolean;
  count: number;
  waitTime: number;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
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

/**
 *@description 数据处理接口,可以根据项目自行配置
 */
export interface AxiosTransform<T> {
  /**
   * @description 请求之前处理配置
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;

  /**
   * @description 请求成功处理
   */
  transformRequestHook?: (res: AxiosResponse<T>, options: RequestOptions) => any;

  /**
   * @description 请求失败处理
   */
  requestCatchHook?: (e: Error) => Promise<any>;

  /**
   * @description 请求之前的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig;

  /**
   * @description 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error & { code: string | number; response: any }) => void;
}
