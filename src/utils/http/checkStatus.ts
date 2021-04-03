import { useI18n } from '../../locales/useI18n';
import { createMessage } from '/@/hooks/web/useMessage';
const error = createMessage.error!;
type errType = 400 | 401 | 403 | 404 | 405 | 408 | 500 | 501 | 502 | 503 | 504 | 505;

export default function checkStatus(status: errType, msg: string): void {
  const { t } = useI18n(),
    errFuncs: { [T in errType]: Fn } = {
      400: () => error(`${msg}`),
      401: () => {
        error(t('sys.api.errMsg401'));
        // user
      },
      403: () => error(t('sys.api.errMsg403')),
      404: () => error(t('sys.api.errMsg404')),
      405: () => error(t('sys.api.errMsg405')),
      408: () => error(t('sys.api.errMsg408')),
      500: () => error(t('sys.api.errMsg500')),
      501: () => error(t('sys.api.errMsg501')),
      502: () => error(t('sys.api.errMsg502')),
      503: () => error(t('sys.api.errMsg503')),
      504: () => error(t('sys.api.errMsg504')),
      505: () => error(t('sys.api.errMsg505')),
    };
  errFuncs[status]();
}
