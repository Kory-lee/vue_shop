import { Modal, notification, message } from 'ant-design-vue';
import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal';
import type { NotificationArgsProps, ConfigProps } from 'ant-design-vue/lib/notification';
import { useI18n } from '/@/i18n/useI18n';
import ModalIcon from './ModalIcon/index.vue';
import { IconsType } from './ModalIcon/icons';

export interface NotifyApi {
  info(config: NotificationArgsProps): void;

  success(config: NotificationArgsProps): void;

  error(config: NotificationArgsProps): void;

  warn(config: NotificationArgsProps): void;

  warning(config: NotificationArgsProps): void;

  open(args: NotificationArgsProps): void;

  close(key: string): void;

  config(opt: ConfigProps): void;

  destroy(): void;
}

export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface ModalOptionEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: IconsType;
}

export type ModalOptionsPartial = Partial<ModalOptionEx> &
  Pick<ModalOptionEx, 'content'> &
  Pick<ModalOptionEx, 'iconType'>;

interface ConfirmOptions {
  info: ModalFunc;
  success: ModalFunc;
  error: ModalFunc;
  warn: ModalFunc;
  warning: ModalFunc;
}

function renderContent({ content }: Pick<ModalOptionEx, 'content'>) {
  return <div innerHTML={content as string} />;
}

export function createConfirm(options: ModalOptionEx) {
  const iconType = options.iconType || 'warning';
  Reflect.deleteProperty(options, 'iconType');
  const opt: ModalFuncProps = {
    centered: true,
    icon: <ModalIcon type={iconType} />,
    ...options,
  };
  return Modal.confirm(opt) as unknown as ConfirmOptions;
}

function getBaseOptions() {
  const { t } = useI18n();
  return { okText: t('common.okText'), centered: true };
}

function createModalOptions(options: ModalOptionsPartial): ModalOptionsPartial {
  const iconType = options.iconType;

  return {
    ...getBaseOptions(),
    ...options,
    content: renderContent(options),
    icon: <ModalIcon type={iconType} />,
  };
}

export function createModal(opt: ModalOptionsPartial) {
  return (Modal[`${opt.iconType}`] as ModalFunc)(createModalOptions(opt));
}

export function createSuccessModal(options: Omit<ModalOptionsPartial, 'iconType'>) {
  return Modal.success(createModalOptions({ ...options, iconType: 'success' }));
}

export function createErrorModal(options: Omit<ModalOptionsPartial, 'iconType'>) {
  return Modal.error(createModalOptions({ ...options, iconType: 'error' }));
}

export function createInfoModal(options: Omit<ModalOptionsPartial, 'iconType'>) {
  return Modal.info(createModalOptions({ ...options, iconType: 'info' }));
}

export function createWarningModal(options: Omit<ModalOptionsPartial, 'iconType'>) {
  return Modal.warning(createModalOptions({ ...options, iconType: 'warning' }));
}

notification.config({
  placement: 'topRight',
  duration: 3,
});

export { message as createMessage };

export { notification };
