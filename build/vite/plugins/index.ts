import type { Plugin } from 'vite';

import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import PurgeIcons from 'vite-plugin-purge-icons';
import windiCSS from 'vite-plugin-windicss';
import VitePluginCertificate from 'vite-plugin-mkcert';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { configHtmlPlugin } from './html';
import { configMockPlugin } from './mock';
import { configPwaConfig } from './pwa';
import { configThemePlugin } from './theme';
import { configImageminPlugin } from './imagemin';
import { configVisualizerConfig } from './visualizer';
import { configCompressPlugin } from './compress';
import { configSvgIconsPlugin } from './svgSprite';
import { configComponentsImportPlugin } from './components';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
      VITE_USE_MOCK,
      VITE_LEGACY,
      VITE_USE_IMAGEMIN,
      VITE_BUILD_COMPRESS,
      VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    } = viteEnv,
    vitePlugins: (Plugin | Plugin[])[] = [
      vue(),
      vueJsx(),
      // support name
      vueSetupExtend(),
      VitePluginCertificate({
        source: 'coding',
      }),
      windiCSS(),
    ];

  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  vitePlugins.push(configSvgIconsPlugin(isBuild));

  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  vitePlugins.push(PurgeIcons());

  vitePlugins.push(configComponentsImportPlugin(isBuild));

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  vitePlugins.push(configThemePlugin(isBuild));

  if (isBuild) {
    VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );

    vitePlugins.push(configPwaConfig(viteEnv));
  }
  return vitePlugins;
}
