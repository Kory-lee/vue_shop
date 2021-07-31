import type { Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configCssRenderPlugin } from './cssRender';

export function createVitePlugins() {
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()];
  vitePlugins.push(configCssRenderPlugin());

  return vitePlugins;
}
