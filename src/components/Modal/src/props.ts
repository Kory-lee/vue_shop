import type { ButtonProps } from 'ant-design-vue/lib/button/buttonTypes';
import type { VueNode } from 'ant-design-vue/lib/_util/type';
import type { CSSProperties, PropType } from 'vue-demi';
import type { ModalWrapperProps } from './types';
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

    afterClose: Function as PropType<() => Promise<VueNode>>,

    bodyStyle: [Object, Array, String] as PropType<CSSProperties>,

    closeable: { type: Boolean, default: true },

    closeIcon: Object as PropType<VueNode>,

    confirmLoading: Boolean,

    destroyOnClose: Boolean,
    footer: Object as PropType<VueNode>,

    getContainer: Function as PropType<() => any>,

    mask: { type: Boolean, default: true },
    maskClosable: { type: Boolean, default: true },

    keyboard: { type: Boolean, default: true },
    maskStyle: [Object, String, Array] as PropType<CSSProperties>,

    okType: { type: String, default: 'primary' },
    okButtonProps: Object as PropType<ButtonProps>,
    cancelButtonProps: Object as PropType<ButtonProps>,

    title: { type: String, default: '' },
    visible: Boolean,

    width: [String, Number] as PropType<string | number>,

    wrapClassName: { type: String, default: '' },
    zIndex: Number,
  },
};
