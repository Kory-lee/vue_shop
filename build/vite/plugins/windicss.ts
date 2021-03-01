import windiCss from 'vite-plugin-windicss';
import type { Plugin } from 'vite';

export default function configWindiCssPlugin(): Plugin[] {
  return windiCss({
    safelist: 'no-select',
    preflight: { enableAll: true },
  });
}
