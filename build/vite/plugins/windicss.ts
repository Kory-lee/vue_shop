import type { Plugin } from 'vite';

import windiCss from 'vite-plugin-windicss';

export function configWindiCSSPlugin(): Plugin[] {
  return windiCss();
}
export default configWindiCSSPlugin;
