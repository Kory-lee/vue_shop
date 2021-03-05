import { isUndefined } from 'lodash';
import { deepMerge } from '../common';
import { isString } from '../is';
import { warn } from '../log';
import { VAxios } from './Axios';
import checkStatus from './checkStatus';
import { errorResult } from './constant';
import { createNow, formatRequestDate, setObjToUrlParams } from './helper';
import type { CreateAxiosOptions, Result, AxiosTransform } from './type';
import { ContentTypeEnum, RequestEnum, ResultEnum } from '/@/enums/httpEnum';
import { useGlobalSetting } from '/@/hooks/setting';
import { createMessage, createModal } from '/@/hooks/web/useMessage';
import i18n from '/@/plugins/i18n';
import { userStore } from '/@/store/modules';

const { prefixUrl, apiUrl } = useGlobalSetting();
console.log(useGlobalSetting());

const transform: AxiosTransform<Result> = {
  transformRequestHook(res, options) {
    const { t } = i18n.global;
    // 不进行任何处理,直接返回
    // 用于界面代码可能需要直接获取code,data,message这些信息时开启
    if (!options.isTransformRequestResult) return res.data;

    // 请求成功
    const { data } = res;
    // return '[HTTP] Request has no return value'
    if (!data) return errorResult;
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, message, result } = data;

    const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    if (!hasSuccess) {
      if (message) {
        if (options.errorMessageMode === 'modal')
          createModal({ iconType: 'error', title: t('sys.api.errorTip'), content: message });
        else if (options.errorMessageMode === 'message') createMessage.error(message);
      }
      Promise.reject(new Error(message));
      return errorResult;
    }
    if (code === ResultEnum.SUCCESS) return result;
    else if (code === ResultEnum.ERROR) {
      if (message) {
        createMessage.error(message);
        Promise.reject(message);
      } else {
        const msg = t('sys.api.errorMessage');
        createMessage.error(msg);
        Promise.reject(new Error(msg));
      }
      return errorResult;
    } else if (code === ResultEnum.TIMEOUT) {
      const timeoutMsg = t('sys.api.timeoutMessage');
      createModal({ iconType: 'error', title: t('sys.api.operationFailed'), content: timeoutMsg });
      return errorResult;
    }
    return errorResult;
  },
  beforeRequestHook(config, options) {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatData, joinTime = true } = options;
    if (isUndefined(config.url)) config.url = '';

    if (joinPrefix) {
      if (!prefixUrl) warn('No prefixUrl is ​​set');
      else config.url = `${prefixUrl}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) config.url = `${apiUrl}${config.url}`;

    const params = config.params || {};
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      // 给get请求加上时间戳参数,避免从黄聪中拿数据
      if (!isString(params)) config.params = Object.assign(params, createNow(joinTime, true));
      else {
        // 兼容restful风格
        config.url = config.url + params + `${createNow(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatData && formatRequestDate(params);
        config.data = params;
        config.params = undefined;
        if (joinParamsToUrl) config.url = setObjToUrlParams(config.url, config.data);
      } else {
        config.url = config.url + params;
        config.params = undefined;
      }
    }

    return config;
  },
  requestInterceptors(config) {
    const token = userStore.getTokenState;
    if (token) config.headers.Authorization = token;
    return config;
  },

  responseInterceptorsCatch(e) {
    const { t } = i18n.global;
    // errorS
    const { response, code, message } = e || {},
      msg: string = response?.data?.error?.message ?? '',
      err: string = e.toString?.() ?? '';
    try {
      if (code === 'ECONNABORTED' && message.includes('timeout'))
        createMessage.error(t('sys.api.apiTimeoutMessage'));
      else if (err?.includes('Network Error!'))
        createModal({
          iconType: 'error',
          title: t('sys.api.networkException'),
          content: t('sys.api.networkExceptionMsg'),
        });
    } catch (e) {
      throw new Error(e);
    }
    checkStatus(response?.status, msg);
    return Promise.reject(e);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 1000,
        prefixUrl,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式, FORM_URLENCODED
        // 数据处理方式
        transform,
        // 配置项,下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 需要对返回数据进行处理
          isTransformRequestResult: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatData: true,
          // 消息提醒类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl,
          // 是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
        },
      } as CreateAxiosOptions,
      opt || {}
    )
  );
}
export default createAxios();
