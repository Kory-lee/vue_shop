import { Modal, notification, message } from 'ant-design-vue';
import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal';
import type { ArgsProps, ConfigProps } from 'ant-design-vue/lib/notification';
import { useI18n } from '/@/i18n/useI18n';
import ModalIcon from './ModalIcon/index.vue';
import { IconsType } from './ModalIcon/icons';

export interface NotifyApi {
  info(config: ArgsProps): void;
  success(config: ArgsProps): void;
  error(config: ArgsProps): void;
  warn(config: ArgsProps): void;
  warning(config: ArgsProps): void;
  open(args: ArgsProps): void;
  close(key: string): void;
  config(opt: ConfigProps): void;
  destroy(): void;
}
export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface ModalOptionEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: IconsType | 'confirm';
}
export type ModalOptionsPartial = Partial<ModalOptionEx> &
  Pick<ModalOptionEx, 'content'> &
  Pick<ModalOptionEx, 'iconType'>;

// interface ConfirmOptions {
//   info: ModalFunc;
//   success: ModalFunc;
//   error: ModalFunc;
//   warn: ModalFunc;
//   warning: ModalFunc;
// }

function renderContent({ content }: Pick<ModalOptionEx, 'content'>) {
  return <div innerHTML={content && `<div>${content as string}<div/>`} />;
}

function getBaseOptions() {
  const { t } = useI18n();
  return { okText: t('common.okText'), centered: true };
}

function createModalOptions(options: ModalOptionsPartial): ModalOptionsPartial {
  if (options.iconType === 'confirm') {
    Reflect.deleteProperty(options, 'iconType');
    return {
      centered: true,
      icon: <ModalIcon type={'warning'} />,
      ...options,
    };
  }
  return {
    ...getBaseOptions(),
    ...options,
    content: renderContent(options),
    icon: <ModalIcon type={options.iconType} />,
  };
}

export function createModal(opt: ModalOptionsPartial) {
  return (Modal[`${opt.iconType}`] as ModalFunc)(createModalOptions(opt));
}

notification.config({
  placement: 'topRight',
  duration: 3,
});

export { message as createMessage };

export { notification };
