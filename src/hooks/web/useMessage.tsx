import { message } from 'ant-design-vue';
import { ArgsProps } from 'ant-design-vue/lib/notification';
// message
export interface NotifyApi {
  info(config: ArgsProps): void;
  success(config: ArgsProps): void;
  error(config: ArgsProps): void;
  warn(config: ArgsProps): void;
}

export function createSuccessModal(options) {}

export { message as createMessage };
