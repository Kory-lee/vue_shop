import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { ViteEnv } from 'utils';
import type { Plugin } from 'vite';
import PurgeIcons from 'vite-plugin-purge-icons';
import configHtmlPlugin from './html';
import { configMockPlugin } from './mock';
import configPwaConfig from './pwa';
import configStyleImportPlugin from './styleImport';
import configWindiCssPlugin from './windicss';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK, VITE_LEGACY, VITE_USE_IMAGEMIN } = viteEnv,
    vitePlugins: (Plugin | Plugin[])[] = [vue(), vueJsx()];

  VITE_LEGACY && isBuild && vitePlugins.push(legacy());
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  vitePlugins.push(configWindiCssPlugin());

  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  vitePlugins.push(PurgeIcons());
  vitePlugins.push(configStyleImportPlugin());
  if (isBuild) {
    VITE_USE_IMAGEMIN;

    vitePlugins.push(configPwaConfig(viteEnv));
  }
  return vitePlugins;
}
