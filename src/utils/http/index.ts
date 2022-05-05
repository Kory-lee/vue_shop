import { deepMerge } from '../common';
import { isString } from '../is';
import { VAxios } from './Axios';
import checkStatus from './checkStatus';
import { errorResult } from './constant';
import { createNow, formatRequestDate, setObjToUrlParams } from './helper';
import type { AxiosTransform, CreateAxiosOptions, Result } from './type';
import { ContentTypeEnum, RequestEnum, ResultEnum } from '/@/enums/httpEnum';
import { useGlobalSetting } from '/@/hooks/setting';
import { useI18n } from '/@/i18n/useI18n';
import { createMessage, createModal } from '/@/hooks/web/useMessage';
import { getToken } from '/@/utils/auth';

const { prefixUrl, apiUrl } = useGlobalSetting();

const transform: AxiosTransform<Result> = {
  transformRequestHook(res, options) {
    const { t } = useI18n();
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
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options;

    if (joinPrefix) config.url = `${prefixUrl}${config.url}`;

    if (apiUrl && isString(apiUrl)) config.url = `${apiUrl}${config.url}`;

    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      // 给get请求加上时间戳参数,避免从缓存中拿数据
      if (!isString(params)) config.params = Object.assign(params, createNow(joinTime, false));
      else {
        // 兼容restful风格
        config.url = config.url + params + `${createNow(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        config.data = params;
        config.params = undefined;
        if (joinParamsToUrl) config.url = setObjToUrlParams(config.url as string, config.data);
      } else {
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },
  requestInterceptors(config, options) {
    // 请求之前处理config
    const token = getToken();
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      (config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },

  responseInterceptorsCatch(e) {
    const { t } = useI18n();
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
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
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
