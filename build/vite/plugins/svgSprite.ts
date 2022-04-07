import type { Plugin } from 'vite';

import {createSvgIconsPlugin} from 'vite-plugin-svg-icons';
import path from 'path';

export function configSvgIconsPlugin(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    symbolId: 'icon-[dir]-[name]',
  }) as Plugin;
}
