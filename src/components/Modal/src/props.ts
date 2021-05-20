import { PropType } from 'vue-demi';
import { ModalWrapperProps } from './types';
import { useI18n } from '/@/i18n/useI18n';

const { t } = useI18n();

export const modalProps = {
  visible: Boolean,
  scrollTop: { type: Boolean, default: true },
  height: Number,
  minHeight: Number,
  draggable: { type: Boolean, default: true },
  centered: Boolean,
  cancelText: { type: String, default: t('common.cancelText') },
  okText: { type: String, default: t('common.okText') },

  closeFunc: Function as PropType<() => Promise<boolean>>,
};

export const basicProps = {
  ...modalProps,
  ...{
    defaultFullScreen: Boolean,
    canFullscreen: { type: Boolean, default: true },
    wrapperFooterOffset: { type: Number, default: 0 },
    helpMessage: [String, Array] as PropType<string | string[]>,
    useWrapper: { type: Boolean, default: true },
    loading: Boolean,
    loadingTip: { type: String, default: '' },
    /**@description show close button */
    showCancelBtn: { type: Boolean, default: true },
    /**@description show confirmation button */
    showOkBtn: { type: Boolean, default: true },
    wrapperProps: Object as PropType<Partial<ModalWrapperProps>>,
  },
};
