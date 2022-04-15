import type { UserConfig } from 'vite';

import { resolve } from 'path';
import { OUTPUT_DIR } from './build/constant';
import { createVitePlugins } from './build/vite/plugins';
const { babel } = require('@rollup/plugin-babel');

const pathResolve = (dir: string): string => resolve(__dirname, dir);

export default (): UserConfig => {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    root: __dirname,
    resolve: {
      alias: isProduction
        ? undefined
        : [
            { find: /^\/@\//, replacement: pathResolve('./src') + '/' },
            {
              find: 'kory-ui',
              replacement: pathResolve('./src'),
            },
          ],
    },
    build: {
      outDir: OUTPUT_DIR,
      rollupOptions: {
        plugins: [
          babel({
            babelHelpers: 'bundled',
          }),
        ],
      },
    },
    define: {
      __IS_DEV__: !isProduction,
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
        'date-fns/locale/nb',
        'date-fns/locale/fr',
        'date-fns/locale/id',
        'date-fns/locale/de',
        'date-fns/locale/ja',
        'date-fns/locale/zh-CN',
        'date-fns/locale/en-US',
        'date-fns/locale/ru',
        'date-fns/locale/uk',
        'date-fns/locale/zh-TW',
        'date-fns/locale/es',
        'date-fns/locale/it',
        'date-fns/locale/en-GB',
        'date-fns/locale/pl',
        'date-fns/locale/eo',
        'date-fns/locale/sk',
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
