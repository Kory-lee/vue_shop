import type { ConfigEnv, UserConfig } from 'vite';

import { resolve } from 'path';
import { loadEnv } from 'vite';
import { OUTPUT_DIR } from './build/constant';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugins';
import { createProxy } from './build/vite/proxy';

const pathResolve = (dir: string): string => resolve(process.cwd(), '.', dir);

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd(),
    env = loadEnv(mode, root),
    viteEnv = wrapperEnv(env),
    { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;
  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: { alias: [{ find: /^\/@\//, replacement: pathResolve('src') + '/' }] },
    server: {
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __VUE_I18N_LEGACY_API__: false,
      __VUE_I18N_FULL_INSTALL__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
      __IS_DEV__: mode !== 'production',
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    optimizeDeps: {
      include: [],
      exclude: [],
    },
  };
};
