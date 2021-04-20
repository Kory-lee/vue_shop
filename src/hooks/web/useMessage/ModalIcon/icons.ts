import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled } from '@ant-design/icons-vue';

export const icons = {
  warning: InfoCircleFilled,
  success: CheckCircleFilled,
  info: InfoCircleFilled,
  error: CloseCircleFilled,
};
export type IconsType = keyof typeof icons;
