import type { AxiosRequestConfig, Canceler } from 'axios';
import { isFunction } from '../is';
import axios from 'axios';
import { warn } from '../log';

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');
export default class AxiosCanceler {
  /**
   * @description 声明一个Map用于储存每个请求的标识和取消函数
   */
  private pendingMap: Map<string, Canceler> = new Map();

  /**
   * @description 添加请求
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!this.pendingMap.has(url)) this.pendingMap.set(url, cancel);
        else warn('pending 中已经存在当前请求,请检查!');
      });
  }

  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    if (this.pendingMap.has(url)) {
      const cancel = this.pendingMap.get(url);
      cancel && cancel(url);
      this.pendingMap.delete(url);
    }
  }
  removeAllPending() {
    this.pendingMap.forEach((cancel) => cancel && isFunction(cancel) && cancel());
    this.pendingMap.clear();
  }
  reset(): void {
    this.pendingMap = new Map();
  }
}
