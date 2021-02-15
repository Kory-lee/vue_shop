import { ViteEnv } from 'utils';
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import vueJsx from '@vitejs/plugin-vue-jsx';
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY,VITE_USE_IMAGEMIN } = viteEnv,
    vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()];
    VITE_LEGACY && isBuild && vitePlugins.push(legacy())
    if(isBuild) {
      VITE_USE_IMAGEMIN
    }
  return vitePlugins;
}
