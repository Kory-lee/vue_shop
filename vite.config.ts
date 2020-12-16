import { resolve } from 'path';
import type { UserConfig } from 'vite';
import globbyTransform from './build/vite/plugins/transform/globby';

const pathResolve = (dir: string): string => resolve(__dirname, dir);

const sharedConfig = {
  alias: { '/@/': pathResolve('src') },
};
const config: UserConfig = {
  /**
   * 端口号
   * @default 3000
   */
  // port: VITE_PORT,
  ...sharedConfig,
  transforms: [
    globbyTransform({
      ...sharedConfig,
      includes: [resolve('src/router'), resolve('src/locales')],
    }),
  ],
  optimizeDeps: {
    include: [
      // 'ant-design-vue/es/locale/zh_CN',
      // 'ant-design-vue/es/locale/en_US',
      '@ant-design/icons-vue',
    ],
  },
  // transforms: [require("vite-transform-globby-import")(sharedConfig)],
};

export default config;
