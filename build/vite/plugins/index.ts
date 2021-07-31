import type { Plugin } from 'vite';

import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configCssRenderPlugin } from './cssRender';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_LEGACY } = viteEnv,
    vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()];

  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  vitePlugins.push(configCssRenderPlugin());

  return vitePlugins;
}
