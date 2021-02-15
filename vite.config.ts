import { createVitePlugins } from './build/vite/plugins';
import { resolve } from 'path';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { generateModifyVars } from './build/config/themeConfig';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';

const pathResolve = (dir: string): string => resolve(__dirname, '.', dir);
const root = process.cwd();
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, root),
    viteEnv = wrapperEnv(env),
    { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv,
    isBuild = command === 'build';
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: { alias: [{ find: /^\/@\//, replacement: pathResolve('src') + '/' }] },
    server: {
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
      hmr: { overlay: true },
    },
    // TODO
    build: {},
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
  };
};
