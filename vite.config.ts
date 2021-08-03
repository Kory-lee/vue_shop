import type { ConfigEnv, UserConfig } from 'vite';

import { resolve } from 'path';
import { loadEnv } from 'vite';
import { OUTPUT_DIR } from './build/constant';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugins';
import { createProxy } from './build/vite/proxy';
// import { babel } from '@rollup/plugin-babel';

const pathResolve = (dir: string): string => resolve(process.cwd(), '.', dir);

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd(),
    env = loadEnv(mode, root),
    viteEnv = wrapperEnv(env),
    { VITE_PORT, VITE_PROXY } = viteEnv;

  return {
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
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __IS_DEV__: mode !== 'production',
    },
    plugins: createVitePlugins(),
    optimizeDeps: {
      include: [
        '@css-render/plugin-bem',
        'async-validator',
        'css-render',
        'date-fns',
        'evtd',
        'highlight.js',
        'lodash-es',
        'seemly',
        'vooks',
        'vue',
        'vue-router',
        'vueuc',
      ],
      exclude: [],
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: `import {h} from 'vue'`,
    },
  };
};
