import { GLOBAL_CONFIG_FILE_NAME } from '../../constant';
import { ViteEnv } from 'utils';
import html from 'vite-plugin-html';
import { Plugin } from 'vite';
import pkg from '../../../package.json';

export default function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOBAL_APP_TITLE, VITE_PUBLIC_PATH } = env,
    path = VITE_PUBLIC_PATH + VITE_PUBLIC_PATH.endsWith('/') ? '' : `/`,
    getAppConfigSrc = () =>
      `${path || '/'}${GLOBAL_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`,
    htmlPlugin: Plugin[] = html({
      minify: isBuild,
      inject: {
        injectData: { title: VITE_GLOBAL_APP_TITLE },
        tags: isBuild ? [{ tag: 'script', attrs: { src: getAppConfigSrc() } }] : [],
      },
    });

  return htmlPlugin;
}
