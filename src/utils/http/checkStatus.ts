import { useI18n } from '/@/i18n/useI18n';
import { createMessage } from '/@/hooks/web/useMessage';
import { Modal } from 'ant-design-vue';
import { ErrorMessageMode } from './type';
import { useUserStoreWithout } from '/@/store/modules/user';
import projectSetting from '/@/settings/projectSetting';
import { SessionTimeoutProcessingEnum } from '/@/enums/configEnum';

const error = createMessage.error;
type errType = 400 | 401 | 403 | 404 | 405 | 408 | 500 | 501 | 502 | 503 | 504 | 505;

export default function checkStatus(
  status: errType,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message'
): void {
  const { t } = useI18n();
  const userStore = useUserStoreWithout();
  const errFuncs: { [T in errType]: Fn } = {
    400: () => `${msg}`,
    401: () => t('sys.api.errMsg401'),
    403: () => t('sys.api.errMsg403'),
    404: () => t('sys.api.errMsg404'),
    405: () => t('sys.api.errMsg405'),
    408: () => t('sys.api.errMsg408'),
    500: () => t('sys.api.errMsg500'),
    501: () => t('sys.api.errMsg501'),
    502: () => t('sys.api.errMsg502'),
    503: () => t('sys.api.errMsg503'),
    504: () => t('sys.api.errMsg504'),
    505: () => t('sys.api.errMsg505'),
  };
  if (status === 401) {
    userStore.setToken(undefined);
    const stp = projectSetting.sessionTimeoutProcessing;

    if (stp === SessionTimeoutProcessingEnum.PAGE_COVERAGE) {
      userStore.setSessionTimeout(true);
    } else {
      userStore.logout(true);
    }
  }
  const errMessage = errFuncs[status]?.();
  if (!errMessage) return;
  if (errorMessageMode === 'modal') {
    Modal.error({ title: t('sys.api.errMsgTitle'), content: errMessage });
  } else if (errorMessageMode === 'message') {
    error({ content: errMessage, key: `global_error_message_status_${status}` });
  }
}
