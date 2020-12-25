import { resolve } from 'path';
import type { Resolver, UserConfig } from 'vite';
import { modifyVars } from './build/config/lessModifyVars';
import { loadEnv } from './build/utils';
import globbyTransform from './build/vite/plugins/transform/globby';

const pathResolve = (dir: string): string => resolve(__dirname, dir);

const ViteEnv = loadEnv();
const { VITE_PORT, VITE_PUBLIC_PATH } = ViteEnv;
const sharedConfig = {
  alias: { '/@/': pathResolve('src') },
  root: process.cwd(),
  resolvers: <Resolver[]>[],
};
const config: UserConfig = {
  /**
   * 端口号
   * @default 3000
   */
  port: VITE_PORT,

  base: VITE_PUBLIC_PATH,
  terserOptions: {
    compress: { keep_infinity: true },
  },

  ...sharedConfig,
  esbuildTarget: 'es2019',
  cssPreprocessOptions: {
    less: {
      modifyVars,
      javascriptEnabled: true,
    },
  },
  transforms: [
    globbyTransform({
      ...sharedConfig,
      includes: [resolve('src/router'), resolve('src/locales')],
    }),
  ],
  optimizeDeps: {
    include: [
      'ant-design-vue/es/locale/zh_CN',
      'ant-design-vue/es/locale/en_US',
      '@ant-design/icons-vue',
    ],
  },
  // transforms: [require("vite-transform-globby-import")(sharedConfig)],
};

export default config;
