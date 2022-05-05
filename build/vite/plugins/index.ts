import type { Plugin } from 'vite';

import vue from '@vitejs/plugin-vue';

import { configCssRenderPlugin } from './cssRender';

export function createVitePlugins() {
  const vitePlugins: (Plugin | Plugin[])[] = [vue(), configCssRenderPlugin()];
  return vitePlugins;
}
