import { toggleClass } from '/@/logics/theme/utils';

export function updateGrayMode(gray: boolean) {
  toggleClass(gray, 'gray-mode', document.documentElement);
}
