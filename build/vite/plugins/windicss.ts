import type { Plugin } from 'vite';

import windiCss from 'vite-plugin-windicss';

export function configWindiCSSPlugin(): Plugin[] {
  return windiCss({
    safelist: 'no-select',
    preflight: { enableAll: true },
  });
}
export default configWindiCSSPlugin;
