import { createVitePlugins } from './build/vite/plugins';
import { resolve } from 'path';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { generateModifyVars } from './build/config/themeConfig';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
import { OUTPUT_DIR } from './build/constant';

const pathResolve = (dir: string): string => resolve(__dirname, '.', dir);

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd(),
    env = loadEnv(mode, root),
    viteEnv = wrapperEnv(env),
    { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv,
    isBuild = command === 'build';
  return {
    base: VITE_PUBLIC_PATH || '/',
    root,
    resolve: { alias: [{ find: /^\/@\//, replacement: pathResolve('src') + '/' }] },
    server: {
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
      hmr: { overlay: true },
    },
    build: {
      outDir: OUTPUT_DIR,
      polyfillDynamicImport: VITE_LEGACY,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 1200,
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/styles/config.less')}";`,
            ...generateModifyVars(),
          },
          javascriptEnabled: true,
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: ['@iconify/iconify'],
    },
  };
};
