import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { isFunction } from '../is';
import AxiosCanceler from './AxiosCancel';
import { CreateAxiosOptions, UploadFileParams } from './type';
import { ContentTypeEnum } from '/@/enums/httpEnum';

export class VAxios {
  private axiosInstance: AxiosInstance;
  private readonly options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }
  private getTransform() {
    return this.options.transform;
  }
  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) return;
    this.axiosInstance = axios.create(config);
  }

  setHeader(headers: any) {
    if (!this.axiosInstance) return;
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }
  /**
   * Interceptor configuration
   */
  private setupInterceptors() {
    const transform = this.getTransform();
    if (!transform) return;
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch,
    } = transform;
    const axiosCanceler = new AxiosCanceler();

    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const {
        headers: { ignoreCancelToken },
      } = config;
      !ignoreCancelToken && axiosCanceler.addPending(config);

      if (requestInterceptors && isFunction(requestInterceptors))
        config = requestInterceptors(config);

      return config;
    }, undefined);

    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) res = responseInterceptors(res);

      return res;
    }, undefined);

    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();
    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        if (!params.data) return;
        const value = params.data[key];
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(`${key}[]`, item));
          return;
        }
        formData.append(key, params.data[key]);
      });
    }
    formData.append(params.name || 'file', params.file, params.filename);
    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        ignoreCancelToken: true,
      },
    });
  }
  // TODO support Form data
}
