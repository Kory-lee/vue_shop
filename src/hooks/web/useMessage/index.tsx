import { Modal, notification as Notify, message } from 'ant-design-vue';
import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal';
import type { ArgsProps, ConfigProps } from 'ant-design-vue/lib/notification';
import OptionList from 'ant-design-vue/lib/vc-select/OptionList';
import type { iconsType } from './icon.vue';
import ModalIcon from './icon.vue';
import i18n from '/@/plugins/i18n';

export interface NotifyApi {
  info(config: ArgsProps): void;
  success(config: ArgsProps): void;
  error(config: ArgsProps): void;
  warn(config: ArgsProps): void;
  warning(config: ArgsProps): void;
  open(args: ArgsProps): void;
  close(key: String): void;
  config(opt: ConfigProps): void;
  destroy(): void;
}
export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface ModalOptionEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: iconsType | 'confirm';
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
  return <div innerHTML={content && `<div>${content as string}<div/>`} />;
}

function getBaseOptions() {
  const { t } = i18n.global;
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

Notify.config({
  placement: 'topRight',
  duration: 3,
});

export const notification: NotifyApi = Notify;

export { message as createMessage };
