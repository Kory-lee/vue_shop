import { toggleClass } from './utils';

export function updateColorWeak(colorWeak: boolean) {
  toggleClass(colorWeak, 'color-weak', document.documentElement);
}
