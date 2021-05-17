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
};

export const basicProps = { ...modalProps, ...{} };
